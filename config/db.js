if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require("mongoose");

const databasename = "realEstateApp";
const azureConnectionString = process.env.AZURE_DATABASE_CONNECTION_STRING
const databaseUrl = "127.0.0.1:27017"
const connectionString = `mongodb://${databaseUrl}/${databasename}`;

module.exports = async () => {
  try {
    console.log("Database is connecting");
    await mongoose.connect(azureConnectionString, {
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
    process.exit(1);
  }
};
