import { Router } from "express";
import {
  getLoginPage,
  loginAdmin,
  getDashboard,
} from "../controllers/adminController";

import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/login", getLoginPage);
router.post("/login", loginAdmin);

router.get("/dashboard", requireAuth, getDashboard);

export default router;