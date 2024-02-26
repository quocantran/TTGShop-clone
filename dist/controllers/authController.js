"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const forgotPassword_model_1 = __importDefault(require("../models/forgotPassword.model"));
const generateRandomString_1 = __importDefault(require("../helpers/generateRandomString"));
const sendMail_1 = __importDefault(require("../helpers/sendMail"));
exports.default = {
    loginPage: (req, res) => {
        const token = req.cookies.token;
        if (token) {
            res.redirect("/");
            return;
        }
        res.render("client/pages/login/index.pug");
    },
    registerPage: (req, res) => {
        res.render("client/pages/register/index.pug");
    },
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({
            email: req.body.email,
        });
        if (!user) {
            res.status(404).render("client/pages/login/index.pug", {
                error: "Email không tồn tại!",
            });
            return;
        }
        if (user.password !== (0, md5_1.default)(req.body.password)) {
            res.status(401).render("client/pages/login/index.pug", {
                error: "Mật khẩu không chính xác!",
            });
            return;
        }
        if (user && user.password === (0, md5_1.default)(req.body.password)) {
            const username = user.first_name + " " + user.last_name;
            const accessToken = jsonwebtoken_1.default.sign({
                id: user._id,
                username: username,
                email: user.email,
                address: user.address,
            }, process.env.SECRET_JWT_KEY, { expiresIn: "365d" });
            res.cookie("token", accessToken, {
                maxAge: 365 * 24 * 60 * 60 * 1000,
            });
            res.cookie("username", username, {
                maxAge: 365 * 24 * 60 * 60 * 1000,
            });
            req.flash("success", "Đăng nhập thành công!");
            res.redirect("/");
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistEmail = yield user_model_1.default.findOne({ email: req.body.email });
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (isExistEmail) {
            res.status(409).render("client/pages/register/index.pug", {
                error: "Email đã được sử dụng!",
            });
            return;
        }
        if (req.body.password.length < 6) {
            res.status(400).render("client/pages/register/index.pug", {
                error: "Mật khẩu cần phải có ít nhất 6 ký tự!",
            });
            return;
        }
        if (!emailRegex.test(req.body.email)) {
            res.status(400).render("client/pages/register/index.pug", {
                error: "Email không đúng định dạng!",
            });
            return;
        }
        req.body.password = (0, md5_1.default)(req.body.password);
        const newUser = new user_model_1.default(req.body);
        yield newUser.save();
        req.flash("success", "Đăng ký thành công!");
        res.redirect("/login");
    }),
    forgotPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).render("client/pages/login/index", {
                error: "Email không tồn tại!",
                showLoginForm: false,
            });
            return;
        }
        const otp = (0, generateRandomString_1.default)(6);
        const token = (0, generateRandomString_1.default)(32);
        const forgot = new forgotPassword_model_1.default({
            email: user.email,
            otp: otp,
            expireAt: Date.now(),
            token: token,
        });
        const isExistUser = yield forgotPassword_model_1.default.findOne({ email: user.email });
        if (isExistUser)
            yield forgotPassword_model_1.default.deleteOne({ email: user.email });
        yield forgot.save();
        //send mail OTP to user
        const subject = "Mã OTP lấy lại mật khẩu";
        const html = `
      <div style="text-align: center;">
          <p style="display:block;font-size: 25px;">Mã OTP để lấy lại mật khẩu của bạn là: <strong style="font-size: 30px; display:block; text-align:center;">${otp}</strong> (Sử dụng trong 5 phút)</p>
          <p style="margin-top: 20px;font-size: 25px;">Vui lòng không chia sẻ mã OTP này với bất kỳ ai.</p>
      </div>
    `;
        (0, sendMail_1.default)(user.email, subject, html);
        //end send mail
        res.cookie("forgot_token", token, { maxAge: 300000 });
        res.redirect(`/reset-password/otp`);
    }),
    resetPasswordPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield forgotPassword_model_1.default.findOne({
            token: req.cookies.forgot_token,
        });
        if (!user) {
            res.redirect("/");
            return;
        }
        res.render("client/pages/reset/index.pug");
    }),
    verifyOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const validOtp = yield forgotPassword_model_1.default.findOne({ otp: req.body.otp });
        if (!validOtp) {
            res.render("client/pages/reset/index.pug", {
                error: "Mã OTP không chính xác!",
            });
            return;
        }
        res.redirect(`/reset-password/reset/${validOtp._id}`);
    }),
    resetPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield forgotPassword_model_1.default.findOne({
            token: req.cookies.forgot_token,
        });
        if (!token) {
            res.redirect("/");
            return;
        }
        const user = yield forgotPassword_model_1.default.findOne({ _id: req.params.id });
        if (!user) {
            res.redirect("/");
            return;
        }
        res.render("client/pages/reset/changePassword.pug", {
            email: user.email,
        });
    }),
    changePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield forgotPassword_model_1.default.findOne({
            token: req.cookies.forgot_token,
        });
        if (!token) {
            res.redirect("/");
            return;
        }
        const password = req.body.password;
        const repeatPassword = req.body.repeat;
        if (password.length < 6) {
            res.render("client/pages/reset/changePassword.pug", {
                error: "Mật khẩu cần ít nhất 6 ký tự!",
            });
            return;
        }
        if (password !== repeatPassword) {
            res.render("client/pages/reset/changePassword.pug", {
                error: "Mật khẩu nhập lại không chính xác!",
            });
            return;
        }
        yield user_model_1.default.updateOne({ email: req.params.email }, {
            password: (0, md5_1.default)(password),
        });
        yield forgotPassword_model_1.default.deleteOne({ token: req.cookies.forgot_token });
        res.render("client/pages/login/index.pug", {
            error: "Thay đổi mật khẩu thành công!",
        });
    }),
};
//# sourceMappingURL=authController.js.map