import { validationResult } from "express-validator";
import {
  createUser,
  findUserByEmail,
  getUserWithRoleByEmail,
} from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Registrarse",
      errors: errors.array(),
      oldData: req.body,
      errorMessage: "Por favor corrige los errores del formulario",
    });
  }

  const { full_name, cedula, phone, address, email, password } = req.body;

  try {
    await createUser({ full_name, cedula, phone, address, email, password });
    req.session.successMessage =
      "Usuario registrado correctamente. ¡Ahora inicia sesión!";
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    req.session.errorMessage =
      "Error interno al registrar. Inténtalo nuevamente";
    res.redirect("/register");
  }
};

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
      return res.status(400).render("login", {
        title: "Iniciar Sesión",
        errorMessage: "Correo no registrado",
        oldData: req.body,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).render("login", {
        title: "Iniciar Sesión",
        errorMessage: "Contraseña incorrecta",
        oldData: req.body,
      });
    }

    // Guardar sesión
    req.session.user = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };

    // Redireccion dependiendo del rol
    if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    } else {
      return res.redirect("/cliente/dashboard");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).render("login", {
      title: "Iniciar Sesión",
      errorMessage: "Error interno. Inténtalo nuevamente.",
    });
  }
};
