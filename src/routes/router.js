import { Router } from "express";
import { isAuthenticated, isAdmin, isClient } from "../middlewares/authMiddleware.js";
import { validatorRegister, validatorLogin } from "../middlewares/validationMiddleware.js";
import { registerUser, loginUser, editarUsuario, renderUsuariosAdmin, renderEditarUsuario, eliminarUsuario } from "../controllers/userController.js";

const router = Router();

/* Raiz */
router.get("/", (req, res) => {
  res.render("index", {
    title: "Inicio",
  });
});

/* Login */
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Iniciar Sesión",
  });
});

router.post("/login", validatorLogin, loginUser);

/* Register */
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Registrar",
    errors: [],
    oldData: {},
    errorMessage: null,
  });
});

router.post("/register", validatorRegister, registerUser);

/* Admin */
router.get("/admin/dashboard", isAuthenticated, isAdmin, (req, res) => {
  res.render("adminDashboard", {
    title: "Panel Administracion",
    user: req.session.user,
  });
});

router.get("/admin/usuarios", isAuthenticated, isAdmin, renderUsuariosAdmin);

router.delete("/admin/usuarios/:id", isAuthenticated, isAdmin, eliminarUsuario);

router.get("/admin/usuarios/:id/editar", isAuthenticated, isAdmin, renderEditarUsuario);

router.put("/admin/usuarios/:id", validatorRegister, isAuthenticated, isAdmin, editarUsuario);

/* Cliente */
router.get("/cliente/dashboard", isAuthenticated, isClient, (req, res) => {
  res.render("clienteDashboard", {
    title: "Mi Panel",
    user: req.session.user,
  });
});

/* LogOut */
router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error al cerrar sesión:", error);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect("/login");
  });
});

export default router;
