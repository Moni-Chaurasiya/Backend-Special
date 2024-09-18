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
import { app } from "./app.js";
dotenv.config(); // Load environment variables

connectDB()
  .then(() => {
    // app.on("error", (error) => {
    //   console.log("ERROR:", error);
    //   throw error;
    // });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!!", error);
  });

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

// function connectDB() {}
// connectDB();
*/
