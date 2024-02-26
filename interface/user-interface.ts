import { Document } from "mongoose";

export interface IUser extends Document {
  id: String;
  username: String;
  email: String;
  address: String;
}
