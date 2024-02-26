import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_DB_LINK);
    console.log("success");
  } catch (err) {
    console.log(err);
  }
};
