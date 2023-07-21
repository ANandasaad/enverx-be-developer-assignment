import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://anandkushwaha:789aditya729A@cluster0.kd7udhp.mongodb.net/Enverx?retryWrites=true&w=majority"
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(`Database error ${error}`);
  }
};

export default dbConnect;
