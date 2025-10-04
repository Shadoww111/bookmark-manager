const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();
const mkToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
router.post("/register", [body("username").trim().isLength({ min: 3 }), body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 })], async (req, res) => {
  try { const errs = validationResult(req); if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() }); const { username, email, password } = req.body;
    if (await User.findOne({ where: { email } })) return res.status(400).json({ msg: "email taken" });
    const user = await User.create({ username, email, password });
    res.status(201).json({ token: mkToken(user.id), user: { id: user.id, username: user.username, email: user.email } });
  } catch (e) { console.error(e.message); res.status(500).json({ msg: "server error" }); }
});
router.post("/login", [body("email").isEmail(), body("password").notEmpty()], async (req, res) => {
  try { const errs = validationResult(req); if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() }); const { email, password } = req.body;
    const user = await User.findOne({ where: { email } }); if (!user || !(await user.checkPw(password))) return res.status(400).json({ msg: "wrong credentials" });
    res.json({ token: mkToken(user.id), user: { id: user.id, username: user.username, email: user.email } });
  } catch (e) { console.error(e.message); res.status(500).json({ msg: "server error" }); }
});
router.get("/me", auth, (req, res) => { res.json({ id: req.user.id, username: req.user.username, email: req.user.email }); });
module.exports = router;
