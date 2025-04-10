import { db } from "../config/db.js";

//Insertar nuevo acceso
export const registrarAcceso = async (userId) => {
  await db.execute(`INSERT INTO access_logs (user_id) VALUES (?)`, [userId]);
};

// Obtener todos los accesos (logs)
export const obtenerAccessLogs = async () => {
  const [rows] = await db.execute(`
      SELECT access_logs.id, access_logs.access_time, users.full_name
      FROM access_logs
      JOIN users ON users.id = access_logs.user_id
      ORDER BY access_logs.access_time DESC
  `);
  return rows;
};
