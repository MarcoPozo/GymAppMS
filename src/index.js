import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/router.js";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

/* Settings */
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

/* Middlewares */
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use(indexRoutes);

/* Manage Error */
app.use((req, res) => {
  res.status(404).render("404");
});

/* Start Server */
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
