import { formatearFecha, fechaRelativa } from "../utils/formatearFecha.js";
import { getAllMemberships, getUsuariosSinMembresia, crearNuevaMembresia, renovarMembresiaPorId } from "../models/membershipModel.js";

export const renderMembresias = async (req, res) => {
  const membresias = await getAllMemberships();

  const membresiasFormateadas = membresias.map((membresia) => ({
    ...membresia,
    fechaInicio: formatearFecha(membresia.start_date),
    fechaFin: formatearFecha(membresia.end_date),
    relativaFin: fechaRelativa(membresia.end_date),
  }));

  res.render("adminMembresias", {
    title: "Membresías",
    membresias: membresiasFormateadas,
  });
};

export const renderNuevaMembresia = async (req, res) => {
  try {
    const users = await getUsuariosSinMembresia();
    res.render("adminNuevaMembresia", {
      title: "Nueva Membresia",
      users,
    });
  } catch (error) {
    console.error("Error al cargar el formulario de membresía:", error);
    req.session.errorMessage = "No se pudo cargar el formulario.";
    res.redirect("/admin/dashboard");
  }
};

export const crearMembresia = async (req, res) => {
  const { user_id, start_date, end_date } = req.body;

  try {
    await crearNuevaMembresia(user_id, start_date, end_date);
    req.session.successMessage = "Membresía creada correctamente";
    res.redirect("/admin/membresias");
  } catch (error) {
    console.error("Error al crear membresía:", error);
    req.session.errorMessage = "No se pudo crear la membresía.";
    res.redirect("/admin/membresias/nueva");
  }
};

export const renovarMembresia = async (req, res) => {
  const { id } = req.params;

  try {
    const nuevaFechaInicio = new Date();
    const nuevaFechaFin = new Date();
    nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + 1);

    await renovarMembresiaPorId(id, nuevaFechaInicio.toISOString().split("T")[0], nuevaFechaFin.toISOString().split("T")[0]);

    req.session.successMessage = "Membresía renovada correctamente.";
    res.redirect("/admin/membresias");
  } catch (error) {
    console.error("Error al renovar la membresía:", error);
    req.session.errorMessage = "No se pudo renovar la membresía.";
    res.redirect("/admin/membresias");
  }
};
