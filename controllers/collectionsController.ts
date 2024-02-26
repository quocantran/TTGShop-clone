import { Request, Response } from "express";
import Products from "../models/products.model";
import convertImage from "../helpers/convertImage";
import { IProduct } from "../interface/product-interface";

export default {
  index: async (req: Request, res: Response) => {
    const brand : string = req.params.id;
    let product: IProduct[];
    let quantity: number;
    if (brand !== "all") {
      product = await Products.find({
        brand: brand,
      }).limit(10);
      quantity = await Products.countDocuments({
        brand: brand,
      });
    } else {
      product = await Products.find().limit(10);
      quantity = await Products.countDocuments({});
    }

    if (product.length === 0) {
      res.redirect("/");
      return;
    }

    let title = "";
    if (brand === "balo-tui") title = "Balo - túi sách";
    if (brand === "pc") title = "PC - Máy tính để bàn";
    if (brand === "vga") title = "VGA - Card màn hình";
    if (brand === "cpu") title = "CPU";
    if (brand === "man-hinh-may-tinh") title = "Màn hình máy tính";
    if (brand === "all") title = "Tất cả sản phẩm";
    const newProduct = convertImage(product);

    res.render("client/pages/collections/index.pug", {
      product: newProduct,
      title: title,
      quantity: quantity,
    });
  },
};
