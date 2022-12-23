const express = require("express");
const signupModel1 = require("../Schema/signupSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser")
router.use(bodyParser.json())
router.post("/login", (req, res) => {
  signupModel1
    .find({ email: req.body.email })
    .then((data) => {
      if (!data.length) {
        res.status(400).send("User doesn't exists!");
        // console.log(data.length);
      } else {
        bcrypt
          .compare(req.body.password, data[0].password)
          .then(function (result) {
            if (result) {
              const authToken = jwt.sign(data[0].email, process.env.SC_KEY);
              res.status(200).send({ authToken });
            } else {
              res.status(400).send("Incorrect password");
            }
          });
          // console.log(data.length);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/signup", (req, res) => {
  signupModel1.find({ email: req.body.email }).then((data) => {
    // console.log(req.body.email)
    console.log(data)
    if (data.length) {
      res.status(400).send("User already exists!");
    } else {
      const newUser = new signupModel1({ ...req.body });
      bcrypt
        .hash(req.body.password, saltRounds)
        .then(function (hash) {
          // Store hash in your password DB.
          newUser.password = hash;
          newUser.confirmpassword = hash;
          newUser
            .save()
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(403).send(err);
            });
        })
        .catch((err) => {
          res.status(404).send({
            status:err,
          message:"Error in reading Data"});
        });
    }
  });
});


module.exports = router;
