import mongoose from "mongoose";

const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 300,
    },
    token: String,
  },
  { timestamps: true }
);

const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot-password"
);
export default ForgotPassword;
