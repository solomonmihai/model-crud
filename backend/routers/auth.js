const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  // TODO: validate
  const { username, email, password } = req.body;
  console.log(req.body);

  const usernameTaken = await User.findOne({ username });
  const emailTaken = await User.findOne({ email });

  if (usernameTaken) {
    return res.status(400).json({ message: "username already used" });
  }
  if (emailTaken) {
    return res.status(400).json({ message: "email already used" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  newUser.save();
  res.json({ status: "success" });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "username not found" });
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.status(400).json({ message: "incorrect password" });
      }

      const payload = {
        id: user._id,
        username: user.username,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) {
            return res.status(400).json({ message: err });
          }
          return res.json({
            message: "success",
            token: "Bearer " + token,
          });
        }
      );
    });
  });
});

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (!token) {
    return res.json({ message: "invalid token", isAuth: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        isAuth: false,
        message: "failed to authenticate",
      });
    }
    req.user = {};
    req.user.id = decoded.id;
    req.user.username = decoded.username;
    next();
  });
}

router.get("/isAuthenticated", verifyJWT, (req, res) => {
  res.json({ isAuth: true, username: req.user.username });
});

module.exports = router;