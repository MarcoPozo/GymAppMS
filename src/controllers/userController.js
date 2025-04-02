import { validationResult } from "express-validator";
import {
  createUser,
  getUserWithRoleByEmail,
  updateUserById,
} from "../models/userModel.js";
import bcrypt from "bcrypt";

/* Registrar Usuario */
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

/* Loguear Usuario */
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
      req.session.errorMessage = "Correo no registrado";
      return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.session.errorMessage = "Contraseña incorrecta";
      return res.redirect("/login");
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
    req.session.errorMessage = "Error interno. Inténtalo nuevamente.";
    return res.redirect("/login");
  }
};

/* Editar Usuario */
export const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { full_name, cedula, email, phone, address } = req.body;

  try {
    await updateUserById(id, { full_name, cedula, email, phone, address });
    req.session.successMessage = "Usuario actualizado correctamente";
    res.redirect("/admin/usuarios");
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    req.session.errorMessage = "Error al actualizar usuario";
    res.redirect("/admin/usuarios");
  }
};
