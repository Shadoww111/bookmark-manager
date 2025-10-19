const express = require("express"); const Bookmark = require("../models/Bookmark"); const auth = require("../middleware/auth"); const router = express.Router(); router.use(auth);
router.get("/export", async (req, res) => { try { const bms = await Bookmark.findAll({ where: { userId: req.user.id }, raw: true });
  const data = bms.map(({ id, userId, createdAt, updatedAt, ...rest }) => rest);
  res.setHeader("Content-Disposition", "attachment; filename=bookmarks.json"); res.json(data);
} catch { res.status(500).json({ msg: "export failed" }); } });
router.post("/import", async (req, res) => { try { const { bookmarks } = req.body; if (!Array.isArray(bookmarks)) return res.status(400).json({ msg: "bad format" }); let n = 0;
  for (const b of bookmarks) { if (b.url && b.title) { await Bookmark.create({ url: b.url, title: b.title, description: b.description||null, userId: req.user.id }); n++; } }
  res.json({ imported: n }); } catch { res.status(500).json({ msg: "import failed" }); } });
module.exports = router;
