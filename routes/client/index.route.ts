import { Express } from "express";
import homeRouter from "./home.route";
import productRouter from "./products.route";
import authRouter from "./auth.route";
import collectionsRouter from "./collections.route";
import accountRouter from "./account.route";
import cartId from "../../middleware/cartMiddleware";
import cartRouter from "./cart.route";
import { Request, Response, NextFunction } from "express";
import checkDevice from "../../middleware/checkdeviceMiddleware";

export default function routes(app: Express) {
  app.use(checkDevice);
  app.use(cartId);
  app.use("/", homeRouter);
  app.use("/", productRouter);
  app.use("/", collectionsRouter);
  app.use("/account", accountRouter);
  app.use("/", cartRouter);
  app.use("/", authRouter);
  app.use(function (req: Request, res: Response, next: NextFunction): void {
    res.render("client/pages/404/index.pug");
  });
}
