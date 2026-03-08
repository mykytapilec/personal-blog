import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

import { connectDB } from "./database";
import guestRoutes from "./routes/guestRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", guestRoutes);
app.use("/admin", adminRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});