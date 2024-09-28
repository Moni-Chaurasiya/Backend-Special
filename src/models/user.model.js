import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10); // Await the hash
//   next();
// });
userSchema.pre("save", async function (next) {
  // Only hash the password if it's new or being modified
  if (!this.isModified("password")) return next();

  // Hash the password and replace the plain text password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

userSchema.methods.isPasswordCorrect = async function (password) {
  console.log("User Password:", this.password); // Check hashed password in DB
  console.log("Entered Password:", password); // Check entered password
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  /*
    A JWT consists of three parts:

Header: Contains metadata about the token, such as the signing algorithm.

Payload: Contains the actual data or "claims" (e.g., user information).

Signature: Verifies the authenticity of the token and ensures that the payload has not been tampered with. 

*/

  //The jwt.sign() function is used to create a new JWT token by combining a payload (data) with a secret key. It then digitally signs the token to ensure its authenticity.

  //Payload: The first argument is an object that contains the data you want to include in the token (often user-related information like userId).

  //Secret Key: The second argument is the secret key or private key used to sign the token.

  //Options (Optional): The third argument is an optional configuration object where you can set things like:

  // expiresIn: Determines how long the token is valid for. Example values:
  // '1h' for 1 hour
  // '2d' for 2 days
  // algorithm: Specifies the signing algorithm (e.g., HS256, RS256).
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
