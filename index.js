const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userController = require("./routes/userRoute");
const signupLoginController = require("./routes/signupLoginRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// const functions = require("firebase-functions");
const DB = process.env.MONGO_DB;

mongoose.connect(
  DB,
  () => {
    console.log("Successfully connected to database!");
  },
  (err) => {
    console.log(err);
  }
);

// app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());



app.get("/", (req, res) => {
  res.status(200).send("Realestate Backend server By DeepakKumar");
});

// app.get("*", (req, res) => {
//   res.status(400).json({
//     status:"failed",
//     message:"Invalid Request SHASHANK",
//   });
// });

app.use(userController);
app.use(signupLoginController);

// exports.deepak_Realestate_Server = functions.https.onRequest(app);

app.listen(5000,()=>console.log("Server is up at 5000 ports"))