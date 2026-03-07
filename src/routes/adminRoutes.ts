import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.send("Admin login page");
});

router.get("/dashboard", (req, res) => {
  res.send("Admin dashboard");
});

export default router;