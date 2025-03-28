import { body } from "express-validator";

export const validatorRegister = [
  body("full_name").notEmpty().withMessage("El nombre completo es obligatorio"),
  body("cedula").notEmpty().withMessage("La cédula es obligatoria"),
  body("email").isEmail().withMessage("Debe ser un correo válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];
