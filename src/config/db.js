import { createPool } from "mysql2/promise";

export const db = createPool({
  host: process.env.DN_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
