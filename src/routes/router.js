import { Router } from "express";
import { isAuthenticated, isAdmin, isClient } from "../middlewares/authMiddleware.js";
import { validatorRegister, validatorLogin } from "../middlewares/validationMiddleware.js";

import { renderHome } from "../controllers/viewsController.js";
import { renderRegister, registerUser } from "../controllers/registerController.js";
import { renderLogin, loginUser, logoutUser } from "../controllers/authController.js";
import { renderAdminDashboard } from "../controllers/adminController.js";
import { renderClienteDashboard } from "../controllers/clienteController.js";
import { editarUsuario, renderUsuariosAdmin, renderEditarUsuario, eliminarUsuario } from "../controllers/userController.js";
import { renderMembresias, renderNuevaMembresia, crearMembresia, renovarMembresia } from "../controllers/membershipController.js";

const router = Router();

// Raiz
router.get("/", renderHome);

//Login
router.get("/login", renderLogin);
router.post("/login", validatorLogin, loginUser);
router.post("/logout", logoutUser);

// Registro
router.get("/register", renderRegister);
router.post("/register", validatorRegister, registerUser);

// Administrador

router.get("/admin/dashboard", isAuthenticated, isAdmin, renderAdminDashboard);
router.get("/admin/usuarios", isAuthenticated, isAdmin, renderUsuariosAdmin);
router.delete("/admin/usuarios/:id", isAuthenticated, isAdmin, eliminarUsuario);
router.get("/admin/usuarios/:id/editar", isAuthenticated, isAdmin, renderEditarUsuario);
router.put("/admin/usuarios/:id", validatorRegister, isAuthenticated, isAdmin, editarUsuario);

// Cliente
router.get("/cliente/dashboard", isAuthenticated, isClient, renderClienteDashboard);

//Membresias
router.get("/admin/membresias", isAuthenticated, isAdmin, renderMembresias);
router.get("/admin/membresias/nueva", isAuthenticated, isAdmin, renderNuevaMembresia);
router.post("/admin/membresias/nueva", isAuthenticated, isAdmin, crearMembresia);
router.post("/admin/membresias/:id/renovar", isAuthenticated, isAdmin, renovarMembresia);

export default router;
