import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

import { getDB } from "../database";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || "");
const db = client.db(process.env.DB_NAME || "personal_blog");

export const getHomePage = async (req: Request, res: Response) => {
  const db = getDB();
  const articles = await db.collection("articles").find().toArray();

  res.render("guest/index", { articles });
};

export const getArticlePage = async (req: Request, res: Response) => {
  try {
    const article = await db
      .collection("articles")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!article) {
      return res.status(404).send("Article not found");
    }

    res.render("guest/article", { article });
  } catch {
    res.status(400).send("Invalid ID");
  }
};