import { validationResult } from "express-validator";
import { createUser } from "../models/registerModel.js";

// Render registro
export const renderRegister = (req, res) => {
  res.render("register", {
    title: "Registrar",
    errors: [],
    oldData: {},
  });
};

// Registrar usuario
export const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Registrarse",
      errors: errors.array(),
      oldData: req.body,
    });
  }

  const { full_name, cedula, phone, address, email, password } = req.body;

  try {
    await createUser({ full_name, cedula, phone, address, email, password });

    req.session.flash = {
      type: "success",
      title: "Registro exitoso ✅",
      message: "Usuario registrado correctamente. ¡Ahora inicia sesión!",
    };

    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    req.session.flash = {
      type: "error",
      title: "Error en el registro ❌",
      message: "Hubo un problema al registrar. Inténtalo nuevamente.",
    };

    res.redirect("/register");
  }
};
