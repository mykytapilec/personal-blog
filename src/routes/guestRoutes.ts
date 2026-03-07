import { Router } from "express";
import { getHomePage, getArticlePage } from "../controllers/guestController";

const router = Router();

router.get("/", getHomePage);
router.get("/article/:id", getArticlePage);

export default router;