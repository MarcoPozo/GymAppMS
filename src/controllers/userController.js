import bcrypt from "bcryptjs";
import { db } from "../config/db.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Registrar Usuario",
      errors: errors.array(),
      old: req.body,
    });
  }

  res.redirect("/login");
};
