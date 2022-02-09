const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); //Access the elements in the .env file

const DB = process.env.DB;
const PORT = process.env.PORT || 4500;

const app = require("./app");
app.listen(PORT, async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //console.log(process.env.NODE_ENV);
    console.log("Database connected succesfully");
    console.log("Server running at port 4500");
  } catch (error) {
    console.log(error);
  }
});
