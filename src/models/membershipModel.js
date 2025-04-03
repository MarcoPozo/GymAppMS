import { db } from "../config/db.js";

export const getAllMemberships = async () => {
  const [rows] = await db.execute(`
      SELECT m.*, u.full_name, u.cedula 
      FROM memberships m 
      JOIN users u ON m.user_id = u.id
    `);
  return rows;
};

export const getUsuariosSinMembresia = async () => {
  const [rows] = await db.execute(`
    SELECT u.id, u.full_name, u.cedula
    FROM users u
    LEFT JOIN memberships m ON u.id = m.user_id
    WHERE m.id IS NULL
  `);
  return rows;
};

export const crearNuevaMembresia = async (user_id, start_date, end_date) => {
  await db.execute(
    `INSERT INTO memberships (user_id, start_date, end_date, status)
     VALUES (?, ?, ?, 'activa')`,
    [user_id, start_date, end_date]
  );
};

export const renovarMembresiaPorId = async (id, nuevaFechaInicio, nuevaFechaFin) => {
  await db.execute(`
    UPDATE memberships 
    SET start_date = ?, end_date = ?, status = 'activa'
    WHERE id = ?
  `, [nuevaFechaInicio, nuevaFechaFin, id]);
};