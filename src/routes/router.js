import { Router } from "express";

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
    title: "Registrar Usuario",
  });
});

export default router;
