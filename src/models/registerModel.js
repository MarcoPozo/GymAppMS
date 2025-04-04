import { db } from "../config/db.js";
import bcrypt from "bcrypt";

// Crear usuario
export const createUser = async ({ full_name, cedula, phone, address, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Encriptado de contraseña

  // Inserción usuarios
  await db.execute("INSERT INTO users (full_name, cedula, phone, address, email, password) VALUES (?, ?, ?, ?, ?, ?)", [full_name, cedula, phone, address, email, hashedPassword]);

  // Busca rol cliente
  const [rows] = await db.execute("SELECT id FROM roles WHERE name = ?", ["cliente"]);
  const roleId = rows[0]?.id || 2; // 1 = Admin / 2 = Cliente

  if (!roleId) {
    throw new Error("Rol 'cliente' no encontrado en la base de datos");
  }

  // Asignacion de rol
  await db.execute("INSERT INTO user_roles (user_id, role_id) VALUES (LAST_INSERT_ID(), ?)", [roleId]);
};

// Buscar usuario por cedula
export const findUserByCedula = async (cedula) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE cedula = ?", [cedula]);
  return rows.length > 0;
};

// Buscar usuario por email
export const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0;
};
