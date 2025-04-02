import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const createUser = async ({
  full_name,
  cedula,
  phone,
  address,
  email,
  password,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Encriptado de contraseña

  /* Inserción usuarios */
  await db.execute(
    "INSERT INTO users (full_name, cedula, phone, address, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [full_name, cedula, phone, address, email, hashedPassword]
  );

  /* Busca rol cliente */
  const [rows] = await db.execute("SELECT id FROM roles WHERE name = ?", [
    "cliente",
  ]);
  const roleId = rows[0]?.id || 2; // 1 = Admin / 2 = Cliente

  if (!roleId) {
    throw new Error("Rol 'cliente' no encontrado en la base de datos");
  }

  /* Asignacion de rol */
  await db.execute(
    "INSERT INTO user_roles (user_id, role_id) VALUES (LAST_INSERT_ID(), ?)",
    [roleId]
  );
};

export const findUserByCedula = async (cedula) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE cedula = ?", [
    cedula,
  ]);
  return rows.length > 0;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length > 0;
};

export const getUserWithRoleByEmail = async (email) => {
  const [rows] = await db.execute(
    `
    SELECT users.*, roles.name as role
    FROM users
    JOIN user_roles ON users.id = user_roles.user_id
    JOIN roles ON roles.id = user_roles.role_id
    WHERE users.email = ?`,
    [email]
  );

  return rows[0];
};

export const getAllUserWithRoles = async () => {
  const [rows] = await db.execute(`
       SELECT users.*, roles.name AS role
      FROM users
      JOIN user_roles ON users.id = user_roles.user_id
      JOIN roles ON user_roles.role_id = roles.id
    `);
  return rows;
};

export const deleteUserById = async (id) => {
  await db.execute("DELETE FROM users WHERE id = ?", [id]);
};
