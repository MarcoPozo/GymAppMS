import { db } from "../config/db.js";

// Total de usuarios
export const getTotalUsuarios = async () => {
  const [rows] = await db.execute("SELECT COUNT(*) as total FROM users");
  return rows[0].total;
};

// Membresías activas
export const getMembresiasActivas = async () => {
  const [rows] = await db.execute("SELECT COUNT(*) as total FROM memberships WHERE status = 'activa'");
  return rows[0].total;
};

// Membresías vencidas
export const getMembresiasVencidas = async () => {
  const [rows] = await db.execute("SELECT COUNT(*) as total FROM memberships WHERE status = 'vencida'");
  return rows[0].total;
};

// Membresías por vencer en 3 días o menos
export const getMembresiasPorVencer = async () => {
  const [rows] = await db.execute(`
    SELECT COUNT(*) as total 
    FROM memberships 
    WHERE status = 'activa' AND DATEDIFF(end_date, CURDATE()) BETWEEN 0 AND 3
  `);
  return rows[0].total;
};
