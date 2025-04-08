import { getMembresiasPorVencer } from "../models/membershipModel.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";
import { formatearFecha } from "../utils/formatearFecha.js";

export const notificarMembresiasPorVencer = async () => {
  try {
    const membresias = await getMembresiasPorVencer(0,3);

    for (const m of membresias) {
      const html = `
        <h2>Hola ${m.full_name},</h2>
        <p>Tu membresía de <strong>GymApp</strong> vencerá el <strong>${formatearFecha(m.end_date)}</strong>.</p>
        <p>Renueva a tiempo para evitar interrupciones y seguir disfrutando de tu entrenamiento 💪</p>
        <br>
        <p>Gracias por ser parte de nosotros.</p>
      `;

      await enviarCorreo({
        to: m.email,
        subject: "⏳ Tu membresía está por vencer",
        html,
      });
    }

    console.log(`✅ Correos enviados a ${membresias.length} usuario(s)`);
  } catch (error) {
    console.error("❌ Error al ejecutar notificación de vencimientos:", error);
  }
};
