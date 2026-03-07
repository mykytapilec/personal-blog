import { Router } from "express";
import {
  getLoginPage,
  loginAdmin,
  getDashboard,
  getAddArticlePage,
  createArticle
} from "../controllers/adminController";

import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/login", getLoginPage);
router.post("/login", loginAdmin);

router.get("/dashboard", requireAuth, getDashboard);

router.get("/add", requireAuth, getAddArticlePage);
router.post("/add", requireAuth, createArticle);

export default router;