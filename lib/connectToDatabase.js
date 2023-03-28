import mongoose from 'mongoose';

// this won't allow data to enter for fields which is not defined in model
mongoose.set('strictQuery', true);

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connectToDatabase = async () => {
  try {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('CONNECTED TO DATABASE');
  } catch (err) {
    console.log('CAN NOT CONNECT TO DATABASE');
  }
};
export default connectToDatabase;
