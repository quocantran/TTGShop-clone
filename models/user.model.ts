import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    address : {
      type : String,
      default : ""
    },
    phone : String,
    
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "user");
export default User;
