import { Request, Response } from "express";

import { getDB } from "../database";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password";

export const getLoginPage = (req: Request, res: Response) => {
  res.render("admin/login");
};

export const loginAdmin = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    return res.redirect("/admin/dashboard");
  }

  res.send("Invalid credentials");
};

export const getDashboard = async (req: Request, res: Response) => {
  const db = getDB();

  const articles = await db.collection("articles").find().toArray();

  res.render("admin/dashboard", { articles });
};