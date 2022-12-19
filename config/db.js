const mongoose = require("mongoose");
const databasename = "realEstateApp";
const conectionString = `mongodb://localhost:27017/${databasename}`;

module.exports = async (app) => {
  try {
    await mongoose.connect(conectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database is conteting");

    mongoose.connection.on(`error`, (err) => {
      console.error(`Database error`);
      console.error(err);
    });
  } catch (err) {
    console.log(err);
    console.error(`Error connetion on database`);
    process.exit(1);
  }
};
