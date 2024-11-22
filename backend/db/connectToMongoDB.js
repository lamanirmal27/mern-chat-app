import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error to connecting to database: ", error);
  }
};

export default connectToMongoDB;
