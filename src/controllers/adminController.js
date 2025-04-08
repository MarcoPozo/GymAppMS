import { getTotalUsuarios, getMembresiasActivas, getMembresiasPorVencer, getMembresiasVencidas } from "../models/dashboardModel.js";

export const renderAdminDashboard = async (req, res) => {
  try {
    const totalUsuarios = await getTotalUsuarios();
    const activas = await getMembresiasActivas();
    const vencidas = await getMembresiasVencidas();
    const porVencer = await getMembresiasPorVencer();

    res.render("adminDashboard", {
      title: "Panel Administracion",
      user: req.session.user,
      totalUsuarios,
      activas,
      vencidas,
      porVencer,
    });
  } catch (error) {
    console.error("❌ Error al cargar dashboard:", error);
    req.session.flash = {
      type: "error",
      title: "Error al cargar panel",
      message: "Ocurrió un problema al obtener la información del sistema.",
    };
    res.redirect("/admin/usuarios");
  }
};
