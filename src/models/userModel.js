import { db } from "../config/db.js";
import bcrypt from "bcrypt";

/* Crear usuario */
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

/* Buscar usuario por cedula */
export const findUserByCedula = async (cedula) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE cedula = ?", [
    cedula,
  ]);
  return rows.length > 0;
};

/* Buscar usuario por email */
export const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length > 0;
};

/* Buscar datos y rol de usuario por email */
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

/* Buscar todos los usuarios y su rol */
export const getAllUserWithRoles = async () => {
  const [rows] = await db.execute(`
       SELECT users.*, roles.name AS role
      FROM users
      JOIN user_roles ON users.id = user_roles.user_id
      JOIN roles ON user_roles.role_id = roles.id
    `);
  return rows;
};

/* Borrar usuario por ID */
export const deleteUserById = async (id) => {
  await db.execute("DELETE FROM users WHERE id = ?", [id]);
};

/* Obtener usuario por ID */
export const getUserById = async (id) => {
  const [rows] = await db.execute(
    `
      SELECT users.*, roles.name AS role 
      FROM users 
      JOIN user_roles ON users.id = user_roles.user_id 
      JOIN roles ON roles.id = user_roles.role_id 
      WHERE users.id = ?`,
    [id]
  );
  return rows[0];
};

/* Actualizar usuario por ID  */
export const updateUserById = async (
  id,
  { full_name, cedula, email, phone, address }
) => {
  await db.execute(
    "UPDATE users SET full_name = ?, cedula = ?, email = ?, phone = ?, address = ? WHERE id = ?",
    [full_name, cedula, email, phone, address, id]
  );
};
