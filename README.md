# GymAppMS

**GymAppMS** es un sistema de gestión de gimnasio desarrollado en Node.js con Express, EJS y Tailwind CSS, orientado a la administración de usuarios, membresías y registros de acceso. Es una aplicación modular y escalable, pensada para administradores de gimnasios que desean llevar un control digital de su negocio.

---

## 🚀 Características principales

- Registro e inicio de sesión con validación de roles (Admin / Cliente).
- Panel de administrador con:
  - Estadísticas generales.
  - Gestión de usuarios (crear, editar, eliminar).
  - Gestión de membresías (crear, renovar, visualizar estado).
  - Registro de logs de acceso (auditoría de inicios de sesión).
- Panel de cliente.
- Diseño moderno usando Tailwind CSS v4.
- Mensajes flash personalizados y validaciones con `express-validator`.

---

## 🧾 Tecnologías utilizadas

- **Backend**: Node.js, Express
- **Base de datos**: MySQL (usando `mysql2/promise`)
- **Motor de vistas**: EJS
- **Estilos**: Tailwind CSS v4
- **Autenticación**: Express-session
- **Validación**: express-validator
- **Encriptado**: bcrypt
- **Tareas programadas**: node-cron
- **Correo**: Nodemailer

---

## 📁 Estructura del proyecto

```
GymAppMS/
│
├── src/
│   ├── config/          # Configuración de base de datos y entorno
│   ├── controllers/     # Lógica de las vistas
│   ├── models/          # Consultas SQL (sin try/catch)
│   ├── routes/          # Definición de rutas principales
│   ├── views/           # Vistas EJS para admin, cliente y público
│   └── public/          # Archivos estáticos y salida CSS de Tailwind
│
├── .env                # Variables de entorno
├── package.json        # Dependencias y scripts
├── database.sql        # Script de estructura de base de datos
```

---

## 📄 Scripts disponibles

- `npm run dev` — Inicia el servidor con Nodemon.
- `npm run build:css` — Compila los estilos de Tailwind CSS en modo watch.

---

## 🛡️ Seguridad

- Contraseñas encriptadas con `bcrypt` antes de ser almacenadas.
- Acceso por roles controlado vía middleware (`isAdmin`, `isClient`).
- Sanitización y validación de inputs con `express-validator`.

---

## 🧪 Primer ejecución

1. Cloná el repositorio.
2. Cargá el archivo `database.sql` en tu servidor MySQL.
3. Configurá tus variables en `.env` (basado en `.env.example`).
4. Ejecutá los scripts:

```bash
npm install
npm run build:css
npm run dev
```

---

## 🏁 Versión actual

**v1.0.0** — Primera versión funcional del sistema GymAppMS, proximas funcionalidades se basaran en la vista del cliente.

---

## ✨ Créditos

Desarrollado por MoonStudio desde Ecuador 💛💙❤️.
