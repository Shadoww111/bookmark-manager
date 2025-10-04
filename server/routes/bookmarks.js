const express = require("express");
const { body, validationResult } = require("express-validator");
const Bookmark = require("../models/Bookmark");
const auth = require("../middleware/auth");
const router = express.Router();
router.use(auth);
router.get("/", async (req, res) => { try { const bms = await Bookmark.findAll({ where: { userId: req.user.id }, order: [["createdAt","DESC"]] }); res.json(bms); } catch { res.status(500).json({ msg: "error" }); } });
router.post("/", [body("url").isURL(), body("title").trim().isLength({ min: 1, max: 200 })], async (req, res) => {
  try { const errs = validationResult(req); if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
    const { url, title, description } = req.body; const favicon = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`;
    const bm = await Bookmark.create({ url, title, description, favicon, userId: req.user.id }); res.status(201).json(bm);
  } catch { res.status(500).json({ msg: "error" }); }
});
router.put("/:id", async (req, res) => { try { const bm = await Bookmark.findOne({ where: { id: req.params.id, userId: req.user.id } }); if (!bm) return res.status(404).json({ msg: "not found" }); const { url, title, description } = req.body; await bm.update({ url: url || bm.url, title: title || bm.title, description: description !== undefined ? description : bm.description }); res.json(bm); } catch { res.status(500).json({ msg: "error" }); } });
router.delete("/:id", async (req, res) => { try { const bm = await Bookmark.findOne({ where: { id: req.params.id, userId: req.user.id } }); if (!bm) return res.status(404).json({ msg: "not found" }); await bm.destroy(); res.json({ msg: "deleted" }); } catch { res.status(500).json({ msg: "error" }); } });
module.exports = router;
