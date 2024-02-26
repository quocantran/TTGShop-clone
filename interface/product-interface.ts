import { Document } from "mongoose";

export interface IProduct extends Document {
  title: String;
  image_url: String;
  slug: String;
  price: String;
  discount: String;
  quantity?: Number;
  totalPrice?: Number;
  deleted: {
    default: false;
    type: Boolean;
  };
  deletedAt: Date;
  brand?: String;
  sold_out: {
    default: false;
    type: Boolean;
  };
}
