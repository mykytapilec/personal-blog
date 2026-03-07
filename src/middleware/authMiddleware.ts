import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isAdmin) {
    return next();
  }

  res.redirect("/admin/login");
}