import { registrarAcceso } from "../models/accessLogModel.js";

export const renderAccessLog = (req, res) => {
  res.render("accessLog", { title: "Registro de Acceso" });
};
