import mongoose from 'mongoose';

// this won't allow data to enter for fields which is not defined in model
// mongoose.set('strictQuery', true);

const MONGODB_URI = process.env.MONGODB_URI;
// const DATABASE_NAME = process.env.DATABASE_NAME;

const connectDB = async () => {
  const { connection } = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};

const connectToDatabase = async (connectionStatus) => {
  try {
    // console.log(`READY STATE ${connectionStatus}`);
    if (connectionStatus === 0) {
      await connectDB();
      console.log('CONNECTED TO DATABASE');
    }
    return;
  } catch (err) {
    console.log('CAN NOT CONNECT TO DATABASE', err);
    return new Error(err);
  }
};
export default connectToDatabase;
