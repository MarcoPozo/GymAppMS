import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import {
  validatorRegister,
  validatorLogin,
} from "../middlewares/validationMiddleware.js";
import {
  isAuthenticated,
  isAdmin,
  isClient,
} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Inicio",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Iniciar Sesión",
  });
});

router.post("/login", validatorLogin, loginUser);

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Registrar",
    errors: [],
    oldData: {},
    errorMessage: null,
  });
});

router.post("/register", validatorRegister, registerUser);

router.get("/admin/dashboard", isAuthenticated, isAdmin, (req, res) => {
  res.render("adminDashboard", {
    title: "Panel Administracion",
    user: req.session.user,
  });
});

router.get("/cliente/dashboard", isAuthenticated, isClient, (req, res) => {
  res.render("clienteDashboard", {
    title: "Mi Panel",
    user: req.session.user,
  });
});

export default router;
