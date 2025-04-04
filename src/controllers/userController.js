import { deleteUserById, getAllUserWithRoles, getUserById, updateUserById } from "../models/userModel.js";

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserById(id);
    req.session.successMessage = "Usuario eliminado correctamente";
    res.redirect("/admin/usuarios");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    req.session.errorMessage = "Hubo un problema al eliminar el usuario";
    res.redirect("/admin/usuarios");
  }
};

// Render usuarios admin
export const renderUsuariosAdmin = async (req, res) => {
  try {
    const users = await getAllUserWithRoles();
    res.render("adminUsuarios", {
      title: "Usuarios",
      users,
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    req.session.errorMessage = "Error al cargar usuarios";
    res.redirect("/admin/dashboard");
  }
};

// Render vista edicion
export const renderEditarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      req.session.errorMessage = "Usuario no encontrado";
      return res.redirect("/admin/usuarios");
    }

    res.render("adminEditarUsuario", {
      title: "Editar Usuario",
      user,
      errors: [],
    });
  } catch (error) {
    console.error("Error al cargar usuario:", error);
    req.session.errorMessage = "Error al cargar la edición del usuario";
    res.redirect("/admin/usuarios");
  }
};

// Editar usuario
export const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { full_name, cedula, email, phone, address } = req.body;

  try {
    await updateUserById(id, { full_name, cedula, email, phone, address });
    req.session.successMessage = "Usuario actualizado correctamente";
    res.redirect("/admin/usuarios");
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    req.session.errorMessage = "Error al actualizar usuario";
    res.redirect("/admin/usuarios");
  }
};
