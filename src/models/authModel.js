import { db } from "../config/db.js";

// Buscar datos y rol de usuario por email
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
