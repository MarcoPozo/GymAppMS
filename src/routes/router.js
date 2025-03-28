import { Router } from "express";
import { registerUser } from "../controllers/userController.js";
import { validatorRegister } from "../middlewares/userMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Inicio",
  });
});

router.get("/login", (req, res) => {
  const { success } = req.query;
  res.render("login", {
    title: "Iniciar Sesión",
    success,
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Registrar",
    errorMessage: null,
    oldData: {},
  });
});

router.post("/register", validatorRegister, registerUser);

export default router;
