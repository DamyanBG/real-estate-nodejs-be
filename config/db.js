const mongoose = require("mongoose");

const databasename = "realEstateApp";
const databaseUrl = "127.0.0.1:27017"
const connectionString = `mongodb://${databaseUrl}/${databasename}`;

module.exports = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database is connecting");

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
