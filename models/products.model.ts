import mongoose from "mongoose";
import { IProduct } from "../interface/product-interface";
const Schema = mongoose.Schema;

const productsSchema = new Schema<IProduct>(
  {
    title: String,
    image_url: String,
    slug: String,
    price: String,
    discount: String,
    deleted: {
      default: false,
      type: Boolean,
    },
    deletedAt: Date,
    quantity: Number,
    totalPrice: Number,
    brand: String,
    sold_out: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsSchema, "product");

export default Products;
