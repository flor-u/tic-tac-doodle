require("dotenv").config();

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const uploader = require("../../configs/cloudinary.configs");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 3;
const fs = require("fs");

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", {
//     "message": req.flash("error")
//   });
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong authenticating user"
      });
      return;
    }

    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }
    req.login(user, err => {
      if (err) {
        res.status(500).json({
          message: "Session save went bad."
        });
        return;
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get("/facebook", passport.authenticate("facebook"));

{
  /* <a href="/auth/facebook">Login with Facebook</a> */
}

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
  })
);

{
  /* <a href="/auth/google">Login With Google</a> */
}

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/private-page",
    failureRedirect: "/" // here you would redirect to the login page using traditional login approach
  })
);

router.get("/signup", (req, res, next) => {
  res.status(200).json({
    message: "yes"
  });
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.status(400).json({
      message: "Provide username and password"
    });
    return;
  }

  User.findOne(
    {
      username
    },
    "username",
    (err, user) => {
      if (err) {
        res.status(500).json({
          message: "Username check went bad."
        });
        return;
      }

      if (user) {
        res.status(400).json({
          message: "Username taken. Choose another one."
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        password: hashPass
      });

      newUser.save(err => {
        if (err) {
          res.status(400).json({
            message: "Error saving user"
          });
          return;
        }
        req.login(newUser, err => {
          if (err) {
            res.status(500).json({
              message: "Error login in after signup"
            });
            return;
          }
          res.status(200).json(newUser);
        });
      });
    }
  );
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({
    message: "Log out success!"
  });
});

router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({
    message: "Unauthorized"
  });
});

router.post("/upload", (req, res) => {
  let user = req.user._id;

  User.findByIdAndUpdate(user, { $push: { doodles: req.body.image } }, { new: true }).then(userUpdated => res.json(userUpdated));
});

module.exports = router;
