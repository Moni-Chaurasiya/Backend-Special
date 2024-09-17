// require("dotenv").config({ path: "./env" });
/*import dotenv from "dotenv";

import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();
*/

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config(); // Load environment variables

connectDB(); // Connect to the database

/*import express from "express";

const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });

    app.listen(process.env.Port, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
    // mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    console.error("ERROR:", error);
    throw err;
  }
})();

function connectDB() {}
connectDB();
*/
