import { validationResult } from "express-validator";
import { createUser } from "../models/userModel.js";

// Registrar usuario
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
    req.session.successMessage = "Usuario registrado correctamente. ¡Ahora inicia sesión!";
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    req.session.errorMessage = "Error interno al registrar. Inténtalo nuevamente";
    res.redirect("/register");
  }
};
