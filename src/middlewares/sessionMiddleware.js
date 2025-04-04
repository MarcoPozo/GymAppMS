import session from "express-session";

//  Validación temprana 
if (!process.env.SESSION_SECRET) {
  throw new Error("❌ SESSION_SECRET no está definido en el archivo .env");
}

// Middleware: express-session
export const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

// Middleware: Mensajes flash personalizados
export const flashMessages = (req, res, next) => {
  res.locals.successMessage = req.session.successMessage || null;
  res.locals.errorMessage = req.session.errorMessage || null;

  req.session.successMessage = null;
  req.session.errorMessage = null;
  next();
};
