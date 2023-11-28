import express from "express";
import { addbook, allbooks, getbook, updatebook, deletebook } from "../controllers/books.js";

const router = express.Router();

router.post("/addbook", addbook);
router.get("/allbooks", allbooks);
router.get("/:id", getbook);
router.put("/:id", updatebook);
router.delete("/:id", deletebook);

export default router;