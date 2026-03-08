import { Router } from "express";
import {
  getLoginPage,
  loginAdmin,
  logoutAdmin,
  getDashboard,
  getAddArticlePage,
  createArticle,
  getEditArticlePage,
  updateArticle,
  deleteArticle
} from "../controllers/adminController";

import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/login", getLoginPage);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/dashboard", requireAuth, getDashboard);

router.get("/add", requireAuth, getAddArticlePage);
router.post("/add", requireAuth, createArticle);
router.get("/edit/:id", requireAuth, getEditArticlePage);
router.post("/edit/:id", requireAuth, updateArticle);
router.post("/delete/:id", requireAuth, deleteArticle);

export default router;