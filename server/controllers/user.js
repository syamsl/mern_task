const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  try {
    // get user by userId
    const user = await User.findById(req.params.userId).exec();
    if (user) {
      res.json({
        message: "User fetched successfully",
        user: user,
      });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    //get all users
    const users = await User.find().exec();
    if (users) {
      res.json(users);
    } else {
      res.json({ message: "No users found" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createNewUser = async (req, res, next) => {
  try {
    //create new user
    const newUser = await new User(req.body).save();
    if (newUser) {
      res.json(newUser);
    } else {
      res.json({ message: "" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    //edit user by userId
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "Update failed" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    //delete user by userId
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "Delete failed" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
