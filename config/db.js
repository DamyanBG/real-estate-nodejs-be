if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require("mongoose");

const connectionString = process.env.AZURE_DATABASE_CONNECTION_STRING

module.exports = async () => {
  try {
    console.log("Database is connecting");
    mongoose.set('strictQuery', false)
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on(`error`, (err) => {
      console.error(`Database error`);
      console.error(err);
    });
  } catch (err) {
    console.log(err);
    console.error(`Error during connection to the database`);
    console.log("Please, check do you have .env file with variable AZURE_DATABASE_CONNECTION_STRING! It must contains the connection string to the database!")
    process.exit(1);
  }
};
