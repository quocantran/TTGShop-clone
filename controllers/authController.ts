import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";
import jwt from "jsonwebtoken";
import ForgotPassword from "../models/forgotPassword.model";
import generateRandomString from "../helpers/generateRandomString";
import sendMail from "../helpers/sendMail";

export default {
  loginPage: (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (token) {
      res.redirect("/");
      return;
    }
    res.render("client/pages/login/index.pug");
  },

  registerPage: (req: Request, res: Response) => {
    res.render("client/pages/register/index.pug");
  },

  login: async (req: Request, res: Response) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).render("client/pages/login/index.pug", {
        error: "Email không tồn tại!",
      });
      return;
    }

    if (user.password !== md5(req.body.password)) {
      res.status(401).render("client/pages/login/index.pug", {
        error: "Mật khẩu không chính xác!",
      });
      return;
    }

    if (user && user.password === md5(req.body.password)) {
      const username = user.first_name + " " + user.last_name;

      const accessToken = jwt.sign(
        {
          id: user._id,
          username: username,
          email: user.email,
          address: user.address,
        },
        process.env.SECRET_JWT_KEY,
        { expiresIn: "365d" }
      );

      res.cookie("token", accessToken, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });

      res.cookie("username", username, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
      req.flash("success", "Đăng nhập thành công!");
      res.redirect("/");
    }
  },

  register: async (req: Request, res: Response) => {
    const isExistEmail = await User.findOne({ email: req.body.email });
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
    req.body.password = md5(req.body.password);
    const newUser = new User(req.body);
    await newUser.save();
    req.flash("success", "Đăng ký thành công!");
    res.redirect("/login");
  },

  forgotPassword: async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).render("client/pages/login/index", {
        error: "Email không tồn tại!",
        showLoginForm: false,
      });
      return;
    }
    const otp: string = generateRandomString(6);
    const token: string = generateRandomString(32);
    const forgot = new ForgotPassword({
      email: user.email,
      otp: otp,
      expireAt: Date.now(),
      token: token,
    });
    const isExistUser = await ForgotPassword.findOne({ email: user.email });
    if (isExistUser) await ForgotPassword.deleteOne({ email: user.email });

    await forgot.save();

    //send mail OTP to user
    const subject = "Mã OTP lấy lại mật khẩu";
    const html = `
      <div style="text-align: center;">
          <p style="display:block;font-size: 25px;">Mã OTP để lấy lại mật khẩu của bạn là: <strong style="font-size: 30px; display:block; text-align:center;">${otp}</strong> (Sử dụng trong 5 phút)</p>
          <p style="margin-top: 20px;font-size: 25px;">Vui lòng không chia sẻ mã OTP này với bất kỳ ai.</p>
      </div>
    `;

    sendMail(user.email, subject, html);
    //end send mail
    res.cookie("forgot_token", token, { maxAge: 300000 });
    res.redirect(`/reset-password/otp`);
  },

  resetPasswordPage: async (req: Request, res: Response) => {
    const user = await ForgotPassword.findOne({
      token: req.cookies.forgot_token,
    });
    if (!user) {
      res.redirect("/");
      return;
    }
    res.render("client/pages/reset/index.pug");
  },

  verifyOtp: async (req: Request, res: Response) => {
    const validOtp = await ForgotPassword.findOne({ otp: req.body.otp });

    if (!validOtp) {
      res.render("client/pages/reset/index.pug", {
        error: "Mã OTP không chính xác!",
      });
      return;
    }

    const user = await User.findOne({ email: validOtp.email });

    if (!user) {
      res.render("client/pages/reset/index.pug", {
        error: "Email không tồn tại!",
      });
      return;
    }

    res.redirect(`/reset-password/reset/${validOtp._id}`);
  },

  resetPage: async (req: Request, res: Response) => {
    const token = await ForgotPassword.findOne({
      token: req.cookies.forgot_token,
    });
    if (!token) {
      res.redirect("/");
      return;
    }

    const user = await ForgotPassword.findOne({ _id: req.params.id });
    if (!user) {
      res.redirect("/");
      return;
    }

    res.render("client/pages/reset/changePassword.pug", {
      email: user.email,
    });
  },

  changePassword: async (req: Request, res: Response) => {
    const token = await ForgotPassword.findOne({
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

    await User.updateOne(
      { email: req.params.email },
      {
        password: md5(password),
      }
    );
    await ForgotPassword.deleteOne({ token: req.cookies.forgot_token });
    res.render("client/pages/login/index.pug", {
      error: "Thay đổi mật khẩu thành công!",
    });
  },
};
