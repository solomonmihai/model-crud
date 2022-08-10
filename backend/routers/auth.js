const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  // TODO: validate
  const { username, email, password } = req.body;

  const usernameTaken = await User.findOne({ username });
  const emailTaken = await User.findOne({ email });

  if (usernameTaken) {
    return res.json({ message: "Username already used" }).status(400);
  }
  if (emailTaken) {
    return res.json({ message: "Email already used" }).status(400);
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
      return res.json({ message: "username not found" }).status(400);
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.json({ message: "incorrect password" }).status(400);
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
            return res.json({ message: err }).status(400);
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
    return res.json({ message: "incorrect token", isLoggedIn: false });
  }

  jwt.verify(token, process.env.PASSPORT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        isLoggedIn: false,
        message: "failed to authenticate",
      });
    }
    req.user = {};
    req.user.id = decoded.id;
    req.user.username = decoded.username;
    next();
  });
}

router.get("/user", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

module.exports = router;