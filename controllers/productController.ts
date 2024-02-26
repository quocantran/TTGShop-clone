import { Request, Response } from "express";
import Products from "../models/products.model";
import convertImage from "../helpers/convertImage";
import { IProduct } from "../interface/product-interface";

export default {
  index: async (req: Request, res: Response) => {
    try {
      const slug = req.params.id;
      const product = await Products.findOne({
        slug: slug,
      });
      const brand = product.brand;

      const suggestProduct = await Products.find({ brand: brand }).limit(10);
      if (!product) {
        res.redirect("/");
        return;
      }
      product.image_url = product.image_url.replace("small", "large");
      const newSuggest = convertImage(suggestProduct);
      res.render("client/pages/product/index.pug", {
        product: product,
        suggestProduct: newSuggest,
        brand: brand,
      });
    } catch (err) {
      res.redirect("/");
    }
  },

  loadMoreProduct: async (req: Request, res: Response) => {
    try {
      const skip: number = parseInt(req.query.skip as string) || 0;

      const brand: string = (req.query.brand as string) || null;
      let product: IProduct[];
      if (brand === "all") {
        product = await Products.find({}).limit(10).skip(skip);
      } else {
        product = await Products.find({ brand: brand }).limit(10).skip(skip);
      }

      const newProduct = convertImage(product);
      res.json(newProduct);
    } catch (err) {
      res.redirect("back");
    }
  },

  suggestProduct: async (req: Request, res: Response) => {
    const keyword = req.body.keyword;

    const products = await Products.find({
      title: { $regex: new RegExp(keyword, "i") },
    }).limit(5);

    for (const item of products) {
      item.image_url.replace("small", "compact");
    }
    if (products.length > 0) {
      res.json(products);
    }
  },

  search: async (req: Request, res: Response) => {
    const keyword: string = req.query.keyword as string;
    const regex = new RegExp(keyword, "i");

    const MAX_PRODUCT = 15;
    const currentPage = parseInt(req.query.page as string) || 1;
    let totalProduct = await Products.find({
      title: { $regex: regex },
    });
    let sizeProduct = totalProduct.length;
    const products = await Products.find({
      title: { $regex: regex },
    })
      .limit(MAX_PRODUCT)
      .skip(MAX_PRODUCT * (currentPage - 1));
    const newProducts = convertImage(products);
    let totalPage: number;
    if (sizeProduct % MAX_PRODUCT == 0)
      totalPage = Math.floor(sizeProduct / MAX_PRODUCT);
    else totalPage = Math.floor(sizeProduct / MAX_PRODUCT) + 1;

    res.render("client/pages/search/index.pug", {
      totalProduct: sizeProduct,
      products: newProducts,
      keyword: keyword,
      currentPage: currentPage,
      totalPage: totalPage,
    });
  },
};
