import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database: ${con.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`Error in MOngoDb ${error}`.bgRed.white);
  }
};

export default connectDb;
