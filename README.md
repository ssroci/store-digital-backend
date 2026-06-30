Digital Store — Backend

API REST para una tienda de indumentaria deportiva. Desarrollada con Node.js + Express + MongoDB.

 Stack

- **Node.js + Express**
- **MongoDB** con Mongoose
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas
- **Nodemailer** para envío de emails
- **express-validator** para validación de inputs

 Estructura del proyecto

```
src/
 ├─ config/         # Conexión a la base de datos
 ├─ models/         # Esquemas Mongoose
 ├─ repositories/   # Acceso a BD (queries)
 ├─ services/       # Lógica de negocio
 ├─ controllers/    # Manejo de req/res
 ├─ routes/         # Express Router
 ├─ middleware/     # auth JWT, validación, errores
 └─ utils/          # jwt, email
```

Instalación

```bash
git clone <repo-url>
cd store-digital-backend

npm install

cp .env.example .env

npm run dev
```

 Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default: 4000) |
| `MONGO_URI` | URI de conexión a MongoDB |
| `JWT_SECRET` | Secreto para firmar tokens JWT |
| `JWT_EXPIRES_IN` | Expiración del JWT (ej: `7d`) |
| `EMAIL_HOST` | Host SMTP (ej: smtp.gmail.com) |
| `EMAIL_PORT` | Puerto SMTP (ej: 587) |
| `EMAIL_USER` | Email remitente |
| `EMAIL_PASS` | Password / App Password |
| `FRONTEND_URL` | URL del frontend (para links en emails) |

---

 Endpoints de la API

Auth

| Método | Endpoint | Descripción | Auth requerida |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario (envía email de verificación) | No |
| GET | `/api/auth/verify-email?token=xxx` | Verificar cuenta por email | No |
| POST | `/api/auth/login` | Login — devuelve JWT | No |
| GET | `/api/auth/profile` | Obtener perfil del usuario autenticado | ✅ JWT |

POST /api/auth/register
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "mipassword123"
}
```

POST /api/auth/login
```json
{
  "email": "juan@example.com",
  "password": "mipassword123"
}
```
Respuesta:
```json
{
  "token": "eyJhbGci...",
  "user": { "id": "...", "name": "Juan Pérez", "email": "...", "role": "user" }
}
```

---

### Categorías

| Método | Endpoint | Descripción | Auth requerida |
|---|---|---|---|
| GET | `/api/categories` | Listar todas las categorías | No |
| GET | `/api/categories/:id` | Obtener categoría por ID | No |
| POST | `/api/categories` | Crear categoría | ✅ JWT |
| PUT | `/api/categories/:id` | Actualizar categoría | ✅ JWT |
| DELETE | `/api/categories/:id` | Eliminar categoría | ✅ JWT |

#### POST /api/categories
```json
{
  "name": "Running",
  "description": "Indumentaria y accesorios para running"
}
```

---

### Productos

| Método | Endpoint | Descripción | Auth requerida |
|---|---|---|---|
| GET | `/api/products` | Listar productos (filtro: `?category=<id>`) | No |
| GET | `/api/products/:id` | Obtener producto por ID | No |
| POST | `/api/products` | Crear producto | ✅ JWT |
| PUT | `/api/products/:id` | Actualizar producto | ✅ JWT |
| DELETE | `/api/products/:id` | Eliminar producto | ✅ JWT |

#### POST /api/products
```json
{
  "title": "Zapatillas Running Pro",
  "description": "Zapatillas livianas para running de alto rendimiento",
  "price": 85000,
  "fileUrl": "https://ejemplo.com/img/zapatillas.jpg",
  "category": "648a1f..."
}
```


## Credenciales de prueba

```
Email: editordigitalro@gmail.com
Password: bhyhncplsorhjejg
```
*(cuenta con email ya verificado)*



## Despliegue

El backend está desplegado en [Vercel](https://vercel.com).  
URL pública: `https://store-digital-backend.vercel.app`

