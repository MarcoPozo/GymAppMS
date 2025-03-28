import { body } from "express-validator";
import { findUserByCedula, findUserByEmail } from "../models/userModel.js";

export const validatorRegister = [
  body("full_name").notEmpty().withMessage("El nombre completo es obligatorio"),

  body("cedula")
    .notEmpty()
    .withMessage("La cédula es obligatoria")
    .bail()
    .custom(async (cedula) => {
      const exists = await findUserByCedula(cedula);
      if (exists) {
        throw new Error("La cédula ya está registrada");
      }
      return true;
    }),

  body("email")
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .bail()
    .custom(async (email) => {
      const exists = await findUserByEmail(email);
      if (exists) {
        throw new Error("El correo electrónico ya está registrado");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];
