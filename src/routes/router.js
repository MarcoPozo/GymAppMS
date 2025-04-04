import { Router } from "express";
import { isAuthenticated, isAdmin, isClient } from "../middlewares/authMiddleware.js";
import { validatorRegister, validatorLogin } from "../middlewares/validationMiddleware.js";

import { logoutUser, loginUser } from "../controllers/authController.js";
import { registerUser } from "../controllers/registerController.js";
import { editarUsuario, renderUsuariosAdmin, renderEditarUsuario, eliminarUsuario } from "../controllers/userController.js";
import { renderMembresias, renderNuevaMembresia, crearMembresia, renovarMembresia } from "../controllers/membershipController.js";

const router = Router();

// Raiz
router.get("/", (req, res) => {
  res.render("index", {
    title: "Inicio",
  });
});

//Login
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Iniciar Sesión",
  });
});

router.post("/login", validatorLogin, loginUser);
router.post("/logout", logoutUser);

// Registro
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Registrar",
    errors: [],
    oldData: {},
    errorMessage: null,
  });
});

router.post("/register", validatorRegister, registerUser);

// Administrador
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

// Cliente
router.get("/cliente/dashboard", isAuthenticated, isClient, (req, res) => {
  res.render("clienteDashboard", {
    title: "Mi Panel",
    user: req.session.user,
  });
});

//Membresias
router.get("/admin/membresias", isAuthenticated, isAdmin, renderMembresias);

router.get("/admin/membresias/nueva", isAuthenticated, isAdmin, renderNuevaMembresia);

router.post("/admin/membresias/nueva", isAuthenticated, isAdmin, crearMembresia);

router.post("/admin/membresias/:id/renovar", isAuthenticated, isAdmin, renovarMembresia);

export default router;
