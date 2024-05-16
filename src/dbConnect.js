const {connect} = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoConnect = async () => {
  try {
    const connectionInstance = await connect(
      `${process.env.MONGO_URL}/${process.env.MONGO_DB}`,
    );
    console.log(
      `\nMongoDB Connected - Database Ready at ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`MongoDB connection Failed: ${error}`);
  }
};

export default mongoConnect