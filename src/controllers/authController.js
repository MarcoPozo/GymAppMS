import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { getUserWithRoleByEmail } from "../models/authModel.js";

// Render login
export const renderLogin = (req, res) => {
  res.render("login", {
    title: "Iniciar Sesión",
    errors: [],
    oldData: {},
  });
};

// Loguear usuario
export const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("login", {
      title: "Iniciar Sesión",
      errors: errors.array(),
      oldData: req.body,
    });
  }

  const { email, password } = req.body;

  try {
    const user = await getUserWithRoleByEmail(email);

    if (!user) {
      req.session.flash = {
        type: "error",
        title: "Usuario no encontrado ❌",
        message: "El correo ingresado no está registrado.",
      };
      return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.session.flash = {
        type: "error",
        title: "Contraseña inválida ❌",
        message: "La contraseña ingresada es incorrecta.",
      };
      return res.redirect("/login");
    }

    // Guardar sesión
    req.session.user = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };

    req.session.flash = {
      type: "success",
      title: "Bienvenido 👋",
      message: `Hola ${user.full_name}, has iniciado sesión correctamente.`,
    };

    // Redirección dependiendo del rol
    if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    } else {
      return res.redirect("/cliente/dashboard");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    req.session.flash = {
      type: "error",
      title: "Error interno ❌",
      message: "Ocurrió un problema al iniciar sesión. Inténtalo nuevamente.",
    };
    return res.redirect("/login");
  }
};

// Logout
export const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error al cerrar sesión:", error);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect("/login");
  });
};
