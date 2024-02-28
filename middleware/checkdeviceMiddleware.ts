import { Request, Response, NextFunction } from "express";
import device from "device";
const checkDevice = (req: Request, res: Response, next: NextFunction) => {
  const userDevice = device(req.headers["user-agent"]);
  if (userDevice.is("phone")) {
    return res.render("client/pages/mobile/index.pug");
  }
  next();
};

export default checkDevice;
