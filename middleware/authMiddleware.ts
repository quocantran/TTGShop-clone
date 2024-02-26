import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user-interface";

export default {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.cookie && cookie.parse(req.headers.cookie).token;

    if (!token) {
      res.redirect("/login");
      return;
    }

    jwt.verify(
      token,
      process.env.SECRET_JWT_KEY,
      (err: jwt.VerifyErrors, user: IUser) => {
        if (err) {
          res.redirect("/login");
          return;
        }
        res.locals.user = user;
        next();
      }
    );
  },
};
