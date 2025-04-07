import { deleteUserById, getAllUserWithRoles, getUserById, updateUserById } from "../models/adminUserModel.js";

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
    req.session.flash = {
      type: "error",
      title: "Error al cargar usuarios ❌",
      message: "Ocurrió un problema al cargar los datos de los usuarios.",
    };
    res.redirect("/admin/dashboard");
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserById(id);
    req.session.flash = {
      type: "success",
      title: "Usuario eliminado ✅",
      message: "El usuario fue eliminado correctamente.",
    };
    res.redirect("/admin/usuarios");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    req.session.flash = {
      type: "error",
      title: "Error al eliminar ❌",
      message: "Hubo un problema al intentar eliminar el usuario.",
    };
    res.redirect("/admin/usuarios");
  }
};

// Render editar usuario
export const renderEditarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      req.session.flash = {
        type: "error",
        title: "Usuario no encontrado ⚠️",
        message: "El usuario que intentas editar no existe.",
      };
      return res.redirect("/admin/usuarios");
    }

    res.render("adminEditarUsuario", {
      title: "Editar Usuario",
      user,
      errors: [],
    });
  } catch (error) {
    console.error("Error al cargar usuario:", error);
    req.session.flash = {
      type: "error",
      title: "Error al cargar ❌",
      message: "No se pudo cargar el formulario de edición.",
    };
    res.redirect("/admin/usuarios");
  }
};

// Editar usuario
export const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { full_name, cedula, email, phone, address } = req.body;

  try {
    await updateUserById(id, { full_name, cedula, email, phone, address });
    req.session.flash = {
      type: "success",
      title: "Usuario actualizado ✅",
      message: "Los datos del usuario se actualizaron correctamente.",
    };
    res.redirect("/admin/usuarios");
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    req.session.flash = {
      type: "error",
      title: "Error al actualizar ❌",
      message: "No se pudo actualizar la información del usuario.",
    };
    res.redirect("/admin/usuarios");
  }
};
