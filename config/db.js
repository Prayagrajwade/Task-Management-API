import mongoose from "mongoose";
import dotenv from "dotenv"
// import { config } from "config";


dotenv.config();

const db = process.env.MONGO_URI



const connectDB = async () => {
    try {
      await mongoose.connect(db, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
       // useCreateIndex: true,
       // useFindAndModify: false
      });
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
export default connectDB;