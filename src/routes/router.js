import { Router } from "express";
import { registerUser } from "../controllers/userController.js";
import { validatorRegister } from "../middlewares/validationMiddleware.js";

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

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Registrar",
    errors: [],
    oldData: {},
    errorMessage: null,
  });
});

router.post("/register", validatorRegister, registerUser);

export default router;
