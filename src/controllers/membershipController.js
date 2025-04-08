import { formatearFecha, fechaRelativa } from "../utils/formatearFecha.js";
import { getAllMemberships, getUsuariosSinMembresia, crearNuevaMembresia, renovarMembresiaPorId, actualizarEstadosVencidos, getUsuarioById } from "../models/membershipModel.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";

// Vista principal de membresías
export const renderMembresias = async (req, res) => {
  try {
    await actualizarEstadosVencidos();
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
  } catch (error) {
    console.error("Error al renderizar membresías:", error);
    req.session.flash = {
      type: "error",
      title: "Error al cargar ❌",
      message: "No se pudieron cargar las membresías.",
    };
    res.redirect("/admin/dashboard");
  }
};

// Vista para crear nueva membresía
export const renderNuevaMembresia = async (req, res) => {
  try {
    const users = await getUsuariosSinMembresia();
    res.render("adminNuevaMembresia", {
      title: "Nueva Membresía",
      users,
    });
  } catch (error) {
    console.error("Error al cargar el formulario de membresía:", error);
    req.session.flash = {
      type: "error",
      title: "Error al cargar ❌",
      message: "No se pudo cargar el formulario para crear una membresía.",
    };
    res.redirect("/admin/dashboard");
  }
};

// Crear una membresía
export const crearMembresia = async (req, res) => {
  const { user_id, start_date, end_date } = req.body;

  try {
    await crearNuevaMembresia(user_id, start_date, end_date);

    const usuario = await getUsuarioById(user_id);

    await enviarCorreo({
      to: usuario.email,
      subject: "Membresía creada en GymAppMS",
      html: `
        <h2>¡Hola ${usuario.full_name}!</h2>
        <p>Tu membresía ha sido creada exitosamente 🎉</p>
        <p><strong>Inicio:</strong> ${start_date}</p>
        <p><strong>Fin:</strong> ${end_date}</p>
        <br>
        <p>Gracias por ser parte de <strong>GymAppMS</strong>.</p>
      `,
    });

    req.session.flash = {
      type: "success",
      title: "Membresía creada ✅",
      message: "La membresía fue registrada correctamente.",
    };
    res.redirect("/admin/membresias");
  } catch (error) {
    console.error("Error al crear membresía:", error);
    req.session.flash = {
      type: "error",
      title: "Error al crear ❌",
      message: "No se pudo registrar la membresía.",
    };
    res.redirect("/admin/membresias/nueva");
  }
};

// Renovar una membresía
export const renovarMembresia = async (req, res) => {
  const { id } = req.params;

  try {
    const nuevaFechaInicio = new Date();
    const nuevaFechaFin = new Date();
    nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + 1);

    await renovarMembresiaPorId(id, nuevaFechaInicio.toISOString().split("T")[0], nuevaFechaFin.toISOString().split("T")[0]);

    req.session.flash = {
      type: "success",
      title: "Membresía renovada 🔁",
      message: "La membresía fue renovada exitosamente por 1 mes.",
    };
    res.redirect("/admin/membresias");
  } catch (error) {
    console.error("Error al renovar la membresía:", error);
    req.session.flash = {
      type: "error",
      title: "Error al renovar ❌",
      message: "No se pudo renovar la membresía.",
    };
    res.redirect("/admin/membresias");
  }
};
