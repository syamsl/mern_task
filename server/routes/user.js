const express = require("express");
const router = express.Router();

const {
  getUser,
  getUsers,
  createNewUser,
  editUser,
  deleteUser,
} = require("../controllers/user");

router.get("/user/:userId", getUser);
router.get("/users", getUsers);
router.post("/user", createNewUser);
router.patch("/user/:userId", editUser);
router.delete("/user/:userId", deleteUser);

module.exports = router;
