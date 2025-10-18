const jwt = require("jsonwebtoken"); const User = require("../models/User");
module.exports = async (req, res, next) => {
  try { const h = req.header("Authorization"); if (!h?.startsWith("Bearer ")) return res.status(401).json({ msg: "no token" });
    const decoded = jwt.verify(h.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id); if (!user) return res.status(401).json({ msg: "bad token" });
    req.user = user; next();
  } catch (e) { if (e.name === "TokenExpiredError") return res.status(401).json({ msg: "token expired", expired: true }); res.status(401).json({ msg: "invalid token" }); }
};
