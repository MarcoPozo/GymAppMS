export const renderAdminDashboard = (req, res) => {
  res.render("adminDashboard", {
    title: "Panel Administracion",
    user: req.session.user,
  });
};
