const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Create a new user
//POST request
//Api/user/
const createUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body; // deconstruct
    if (!username || !password) {
      // check for correct input
      res.status(400).json({ msg: `Please enter a username and password.` });
    }

    const existingUser = await User.findOne({ username }); // find user based on email
    if (existingUser) {
      // check if user already exist
      res.status(400).json({ msg: `User already exist in database.` });
    }

    const salt = await bcrypt.genSalt(10); // hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
    }); // create new user

    res.status(201).json({
      msg: `User has been created in database.`,
      _id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(401).json({ msg: `New user was NOT created. ${error}` });
  }
});

//Login User
//POST request
//api/user/login
const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body; // deconstruct
    if (!username || !password) {
      // check for correct input
      res.status(400).json({ msg: `Please enter a username and password.` });
    }

    const user = await User.findOne({ username }); //find user by username

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        msg: `User successfully logged in.`,
        _id: user.id,
        username: user.username,
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    res
      .status(401)
      .json({ msg: `User login unsuccessful, NOT AUTHORIZED. ${error}` });
  }
});

//Get all users
// GET request
//api/user/for/test/only
const get = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body; // deconstruct
    const user = await User.find({ username });
    res.status(200).json({
      username,
    });
  } catch (error) {
    res
      .status(401)
      .json({ msg: `User login unsuccessful, NOT AUTHORIZED. ${error}` });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};

module.exports = {
  createUser,
  login,
  get,
};
