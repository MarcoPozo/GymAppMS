import "dotenv/config";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/router.js";
import methodOverride from "method-override";
import {
  sessionConfig,
  flashMessages,
} from "./middlewares/sessionMiddleware.js";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

/* Settings */
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

/* Middlewares */
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      return req.body._method;
    }
  })
);

app.use(sessionConfig);
app.use(flashMessages);

/* Routes */
app.use(indexRoutes);

/* Manage Error */
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Pagina no encontrada",
  });
});

/* Start Server */
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
