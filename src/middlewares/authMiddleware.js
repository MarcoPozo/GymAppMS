export const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    req.session.errorMessage = "Debes iniciar sesión para acceder.";
    return res.redirect("/login");
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (req.session.user?.role !== "admin") {
    req.session.errorMessage = "Acceso denegado.";
    return res.redirect("/login");
  }
  next();
};

export const requireCliente = (req, res, next) => {
  if (req.session.user?.role !== "cliente") {
    req.session.errorMessage = "Acceso dengado.";
    return res.redirect("/login");
  }
  next();
};
