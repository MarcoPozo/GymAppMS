import { validationResult } from "express-validator";
import { createUser } from "../models/userModel.js";

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
    res.redirect("/login?success=1");
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    res.status(500).render("register", {
      title: "Registrarse",
      errorMessage: "Error interno al registrar. Inténtalo nuevamente",
    });
  }
};
