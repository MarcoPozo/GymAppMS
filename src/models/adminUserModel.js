import { db } from "../config/db.js";

// Buscar todos los usuarios y su rol
export const getAllUserWithRoles = async () => {
  const [rows] = await db.execute(`
       SELECT users.*, roles.name AS role
      FROM users
      JOIN user_roles ON users.id = user_roles.user_id
      JOIN roles ON user_roles.role_id = roles.id
    `);
  return rows;
};

// Borrar usuario por ID
export const deleteUserById = async (id) => {
  await db.execute("DELETE FROM users WHERE id = ?", [id]);
};

// Obtener usuario por ID
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

// Actualizar usuario por ID
export const updateUserById = async (id, { full_name, cedula, email, phone, address }) => {
  await db.execute("UPDATE users SET full_name = ?, cedula = ?, email = ?, phone = ?, address = ? WHERE id = ?", [full_name, cedula, email, phone, address, id]);
};
