import express from "express";
//This imports the Express.js library, which is a minimal and flexible Node.js web application framework. It provides tools to build web servers and handle requests and responses easily.

import cors from "cors";
//This imports the CORS (Cross-Origin Resource Sharing) middleware from the cors package. CORS is a mechanism that allows resources on a web server to be requested from another domain (cross-domain requests).

import cookiesParse from "cookie-parser";
//This imports cookies-parser, which is a middleware for parsing cookies from the incoming request headers. It makes it easy to access and manipulate cookies in your application, enabling you to retrieve and store session data.

const app = express();
//This creates an Express application object, which is essentially your web server. This app object will be used to define routes, middleware, and the general behavior of the server. This is the starting point for using Express.js.

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    //The origin specifies which domains are allowed to make requests to your server.

    credentials: true,
    //This setting allows cookies or authentication headers (such as authorization tokens) to be included in the cross-origin requests. Without this, the browser would block cookies from being sent/received.
  })
);
//This line adds the CORS middleware to the Express app using app.use(), which allows you to apply middleware globally to all routes in the app.

app.use(express.json({ limit: "16kb" }));
//This adds a middleware to parse incoming JSON request bodies.By default, Express can handle JSON payloads, but this middleware ensures that it limits the size of JSON payloads to 16kb, helping prevent excessively large payloads from consuming server resources.
//Why used: It is necessary to handle JSON request bodies, such as when submitting forms or sending JSON data via POST requests.

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//This middleware parses application/x-www-form-urlencoded data (e.g., traditional form data). The extended: true option allows for nested objects to be parsed, and the limit: "16kb" restricts the size of the body to 16 kilobytes.

app.use(express.static("public"));
//This middleware serves static files such as HTML, CSS, JavaScript, images, etc., from the public directory. When the server receives a request for static assets, it will look for them in the public folder.

app.use(cookiesParse());
//This middleware parses the cookies attached to the incoming request and makes them available in req.cookies. This allows the app to access cookie data that the client might send with requests (such as authentication tokens or session identifiers).

//routes import
import userRouter from "./routes/user.routes.js";
//routes declaration
app.use("/api/v1/users", userRouter);
//    http://localhost:8000/api/v1/users/register
export { app };
