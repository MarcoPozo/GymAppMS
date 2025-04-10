import { obtenerAccessLogs } from "../models/accessLogModel.js";

export const renderAccessLog = async (req, res) => {
  try {
    const logs = await obtenerAccessLogs();
    res.render("accessLog", {
      title: "Registro de Acceso",
      logs,
    });
  } catch (error) {
    console.error("❌ Error al mostrar logs de acceso:", error);
    req.session.flash = {
      type: "error",
      title: "Error al cargar logs",
      message: "Ocurrió un problema al obtener los registros de acceso.",
    };
    res.redirect("/admin/dashboard");
  }
};
