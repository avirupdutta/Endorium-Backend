const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Message = require("../models/messages");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization failed!" });
  }
};

//Middle for One user
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

//Middle for One Message
async function getMessages(req, res, next) {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: "Cannot find the Message" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.message = message;
  next();
}

module.exports = {
  auth,
  getUser,
  getMessages,
};
