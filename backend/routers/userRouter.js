const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const multer = require("multer");
const User = require("../models/User");
// Code for Storing Profile Pic using multer package.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const uploadProfileImage=multer({storage:storage})

// Register Route
router.post("/",uploadProfileImage.single("profilePic") ,async (req, res) => {
  try {
    const {username,fullname, email, password, confirmpassword } = req.body;
    const profilePic=req.file.filename
    // Validation
    if (!username||!fullname||!email || !password || !confirmpassword) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters",
      });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({
        errorMessage: "Passwords do not match",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "User already exists with that email.",
      });
    }
    // Hashing User Password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Save a user to database
    const newUser = new User({
      username,
      fullname,
      email,
      hashPassword,
      profilePic
    });
    const savedUser = await newUser.save();

    // Log In User

 
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in http only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
    // Never Throw status code errors to front-end
    res.status(500).send();
  }
});
// Login Router
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errorMessage: "Wrong Email Or Password" });
    }
    const correctPassword = await bcrypt.compare(password, user.hashPassword);
    if (!correctPassword) {
      return res.status(401).json({ errorMessage: "Wrong Email Or Password" });
    }
    const token = jwt.sign(
      {
        user: user._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
  }
});
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// Protected Route
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
});
// Getting User Data
router.get("/userdata", auth, async (req, res) => {
  const user = req.user;
  const authUser = await User.findOne({ _id: user }).exec();
  res.send(authUser);
});

module.exports=router;
