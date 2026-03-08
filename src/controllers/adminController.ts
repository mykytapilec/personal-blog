import e, { Request, Response } from "express";
import { ObjectId } from "mongodb";

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

export const logoutAdmin = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
}

export const getDashboard = async (req: Request, res: Response) => {
  const db = getDB();

  const articles = await db.collection("articles").find().toArray();

  res.render("admin/dashboard", { articles });
};

export const getAddArticlePage = (req: Request, res: Response) => {
  res.render("admin/add");
};

export const createArticle = async (req: Request, res: Response) => {

  const { title, content, date } = req.body;

  const db = getDB();

  await db.collection("articles").insertOne({
    title,
    content,
    date: new Date(date)
  });

  res.redirect("/admin/dashboard");
};

export const getEditArticlePage = async (req: Request, res: Response) => {

  const db = getDB();

  const article = await db
    .collection("articles")
    .findOne({ _id: new ObjectId(req.params.id) });

  if (!article) {
    return res.status(404).send("Article not found");
  }

  res.render("admin/edit", { article });
};

export const updateArticle = async (req: Request, res: Response) => {

  const { title, content, date } = req.body;

  const db = getDB();

  await db.collection("articles").updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        title,
        content,
        date: new Date(date)
      }
    }
  );

  res.redirect("/admin/dashboard");
};

export const deleteArticle = async (req: Request, res: Response) => {

  const db = getDB();

  await db.collection("articles").deleteOne({
    _id: new ObjectId(req.params.id)
  });

  res.redirect("/admin/dashboard");
};