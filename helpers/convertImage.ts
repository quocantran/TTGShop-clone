import { IProduct } from "../interface/product-interface";

export default function convertImage(data: IProduct[]) {
  for (const item of data) {
    item.image_url = item.image_url.replace("small", "large");
  }
  return data;
}
