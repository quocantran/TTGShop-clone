import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Products from "../models/products.model";
import convertMoney from "../helpers/convertMoney";

export default {
  addToCart: async (req: Request, res: Response) => {
    const cart = await Cart.findOne({ _id: req.cookies.cart_id });
    const product = await Products.findOne({ _id: req.params.id });
    if (product.price === "0₫") return res.redirect("back");
    if (cart) {
      const isExistProduct = cart.products.find(
        (item) => item.product_id === req.params.id
      );

      if (isExistProduct) {
        let newQuantity: number;
        if (!req.body.quantity) {
          newQuantity = isExistProduct.quantity + 1;
        } else {
          newQuantity = isExistProduct.quantity + parseInt(req.body.quantity);
        }
        await Cart.updateOne(
          { _id: req.cookies.cart_id, "products.product_id": req.params.id },
          {
            "products.$.quantity": newQuantity,
          }
        );
      } else {
        if (!req.body.quantity) {
          const product = {
            product_id: req.params.id,
            quantity: 1,
          };
          await Cart.updateOne(
            { _id: req.cookies.cart_id },
            {
              $push: { products: product },
            }
          );
        } else {
          const product = {
            product_id: req.params.id,
            quantity: parseInt(req.body.quantity),
          };
          await Cart.updateOne(
            { _id: req.cookies.cart_id },
            {
              $push: { products: product },
            }
          );
        }
      }

      req.app.locals.cartData = product;
      req.flash("addSuccess", "success");

      if (req.body.cart !== undefined) res.redirect("/cart");
      else res.redirect("back");
    }
  },

  cartPage: async (req: Request, res: Response) => {
    const cart = await Cart.findOne({ _id: req.cookies.cart_id });
    const quantityMap: any = {};
    cart.products.forEach((item) => {
      quantityMap[item.product_id] = item.quantity;
    });
    const product_id = cart.products.map((item) => item.product_id);
    const product = await Products.find({
      _id: {
        $in: product_id,
      },
    });

    for (const item of product) {
      item.image_url = item.image_url.replace("small", "medium");
      const productIdString = item._id.toString();
      if (quantityMap.hasOwnProperty(productIdString)) {
        item.quantity = quantityMap[productIdString];
      }
      const price = item.price.replace(/,/g, "").replace("₫", "");
      const qty = item.quantity as number;
      item.totalPrice = parseFloat(price) * qty;
    }

    let totalPrice = product.reduce((init, item) => {
      const price = item.totalPrice as number;
      return price + init;
    }, 0);
    let convertPrice: string = convertMoney(totalPrice);

    convertPrice = convertPrice.replace(/\./g, ",");
    res.render("client/pages/cart/index.pug", {
      totalPrice: convertPrice,
      priceInteger: totalPrice,
      product: product,
    });
  },

  removeProduct: async (req: Request, res: Response) => {
    const id = req.params.id;

    await Cart.updateOne(
      { _id: req.cookies.cart_id },
      {
        $pull: {
          products: {
            product_id: id,
          },
        },
      }
    );

    res.redirect("back");
  },
};
