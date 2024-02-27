"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
exports.default = {
    verifyToken: (req, res, next) => {
        const token = req.headers.cookie && cookie_1.default.parse(req.headers.cookie).token;
        if (!token) {
            res.redirect("/login");
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
            if (err) {
                res.redirect("/login");
                return;
            }
            res.locals.user = user;
            next();
        });
    },
};
//# sourceMappingURL=authMiddleware.js.map