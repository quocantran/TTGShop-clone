import { Request, Response } from "express";
import { IUser } from "../interface/user-interface";
export default {
  index: async (req: Request, res: Response) => {
    const user: IUser = res.locals.user;

    res.render("client/pages/account/home.pug", {
      user: user,
    });
  },
};
