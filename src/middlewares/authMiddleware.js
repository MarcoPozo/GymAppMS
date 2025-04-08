export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.session.flash = {
    type: "error",
    title: "Acceso Denegado ❌",
    message: "Debes iniciar sesión para acceder.",
  };
  return res.redirect("/login");
};

export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  req.session.flash = {
    type: "error",
    title: "Acceso Denegado ❌",
    message: "Solo administradores.",
  };
  return res.redirect("/login");
};

export const isClient = (req, res, next) => {
  if (req.session.user && req.session.user.role === "cliente") {
    return next();
  }
  req.session.flash = {
    type: "error",
    title: "Acceso Denegado ❌",
    message: "Solo clientes.",
  };
  return res.redirect("/login");
};
