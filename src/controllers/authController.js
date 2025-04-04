import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { getUserWithRoleByEmail } from "../models/authModel.js";

// Render login
export const renderLogin = (req, res) => {
  res.render("login", {
    title: "Iniciar Sesión",
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

//LogOut User
export const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error al cerrar sesión:", error);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect("/login");
  });
};
