export const renderClienteDashboard = (req, res) => {
  res.render("clienteDashboard", {
    title: "Mi Panel",
    user: req.session.user,
  });
}