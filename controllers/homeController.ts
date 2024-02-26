import { Request, Response } from "express";

import convertImage from "../helpers/convertImage";

import Products from "../models/products.model";

export default {
  index: async (req: Request, res: Response) => {
    try {
      const product = await Products.find({
        deleted: false,
        sold_out: false,
        discount: {
          $ne: "",
        },
      }).limit(10);
      const cpu = await Products.find({
        deleted: false,
        sold_out: false,
        brand: "cpu",
      }).limit(10);

      const screen = await Products.find({
        deleted: false,
        sold_out: false,
        brand: "man-hinh-may-tinh",
      });

      const vga = await Products.find({
        deleted: false,
        sold_out: false,
        brand: "vga",
      });

      const newProduct = convertImage(product);
      const newCpu = convertImage(cpu);
      const newScreen = convertImage(screen);
      const newVga = convertImage(vga);
      res.render("client/pages/home/index.pug", {
        product: newProduct,
        cpu: newCpu,
        screenProduct: newScreen,
        vgaProduct: newVga,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
