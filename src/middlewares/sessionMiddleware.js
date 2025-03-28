import session from "express-session";
import dotenv from "dotenv";

/* Middleware: express-session */
export const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

/* Middleware: Mensajes flash personalizados */
export const flashMessages = (req, res, next) => {
  res.locals.successMessage = req.session.successMessage || null;
  res.locals.errorMessage = req.session.errorMessage || null;

  req.session.successMessage = null;
  req.session.errorMessage = null;
  next();
};
