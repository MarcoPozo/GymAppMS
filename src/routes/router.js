import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { getAllUserWithRoles, deleteUserById } from "../models/userModel.js";
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

/* Admin */
router.get("/admin/dashboard", isAuthenticated, isAdmin, (req, res) => {
  res.render("adminDashboard", {
    title: "Panel Administracion",
    user: req.session.user,
  });
});

router.get("/admin/usuarios", isAuthenticated, isAdmin, async (req, res) => {
  const users = await getAllUserWithRoles();
  res.render("adminUsuarios", {
    title: "Usuarios",
    users,
  });
});

router.delete(
  "/admin/usuarios/:id",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      await deleteUserById(id);
      req.session.successMessage = "Usuario eliminado correctamente";
      res.redirect("/admin/usuarios");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      req.session.errorMessage = "Hubo un problema al eliminar el usuario";
      res.redirect("/admin/usuarios");
    }
  }
);

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
