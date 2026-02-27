# Backend del Portfolio

Backend unificado desarrollado con **NestJS** y **Node.js** que combina funcionalidades públicas y de administración.

## 🚀 Características

- **API Pública**: Endpoints para formulario de contacto y visualización de proyectos
- **Panel de Administración**: Gestión completa de usuarios, contactos y proyectos
- **Autenticación JWT**: Sistema seguro con refresh tokens
- **Control de Acceso**: Roles (ADMIN, SUPER_ADMIN) con guards
- **Base de Datos**: MySQL con Prisma ORM
- **Validación**: DTOs con class-validator
- **Documentación**: Swagger/OpenAPI automática
- **Rate Limiting**: Protección contra abuso de API
- **Upload de Archivos**: Gestión de imágenes para proyectos

## 📋 Requisitos Previos

- Node.js >= 18
- MySQL >= 8.0
- npm o yarn

## 🛠️ Instalación

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
copy .env.example .env

# Editar .env con tus configuraciones
```

3. **Configurar base de datos MySQL**

Crear una base de datos en MySQL:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Actualizar la URL de conexión en `.env`:
```
DATABASE_URL="mysql://usuario:password@localhost:3306/portfolio_db"
```

4. **Generar Prisma Client y ejecutar migraciones**
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. **Poblar la base de datos con datos iniciales**
```bash
npm run prisma:seed
```

## 🎯 Scripts Disponibles

### Desarrollo
```bash
npm run start:dev          # Iniciar en modo desarrollo con hot-reload
npm run start:debug        # Iniciar en modo debug
```

### Producción
```bash
npm run build              # Compilar para producción
npm run start:prod         # Iniciar en modo producción
```

### Base de Datos
```bash
npm run prisma:generate    # Generar Prisma Client
npm run prisma:migrate     # Ejecutar migraciones
npm run prisma:seed        # Poblar base de datos
npm run prisma:studio      # Abrir Prisma Studio (GUI)
```

### Testing
```bash
npm run test               # Ejecutar tests
npm run test:watch         # Tests en modo watch
npm run test:cov           # Tests con cobertura
npm run test:e2e           # Tests end-to-end
```

## 📚 Documentación API

Una vez iniciado el servidor, la documentación Swagger está disponible en:
```
http://localhost:3000/api/docs
```

## 🔐 Autenticación

### Credenciales por defecto (después del seed)
- **Email**: admin@portfolio.com
- **Password**: Admin123!

### Flujo de autenticación

1. **Login**
```bash
POST /api/auth/login
{
  "email": "admin@portfolio.com",
  "password": "Admin123!"
}
```

2. **Usar el token**
```bash
Authorization: Bearer {accessToken}
```

3. **Refrescar token**
```bash
POST /api/auth/refresh
{
  "refreshToken": "{refreshToken}"
}
```

## 📁 Estructura del Proyecto

```
backend/
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   └── seed.ts            # Datos iniciales
├── src/
│   ├── auth/              # Módulo de autenticación
│   ├── users/             # Gestión de usuarios
│   ├── admin/             # Panel de administración
│   │   ├── contact/       # Gestión de contactos
│   │   └── portfolio/     # Gestión de proyectos
│   ├── express/           # API pública
│   ├── prisma/            # Servicio de base de datos
│   ├── common/            # Utilidades compartidas
│   ├── app.module.ts      # Módulo raíz
│   └── main.ts            # Punto de entrada
├── uploads/               # Archivos subidos
└── package.json
```

## 🌐 Endpoints Principales

### Públicos (sin autenticación)
- `GET /api/health` - Estado del servidor
- `GET /api/portfolio` - Listar proyectos publicados
- `GET /api/portfolio/:id` - Ver proyecto específico
- `POST /api/contact` - Enviar formulario de contacto

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Refrescar token
- `POST /api/auth/logout` - Cerrar sesión

### Admin - Usuarios (requiere autenticación)
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario (SUPER_ADMIN)
- `PATCH /api/users/:id` - Actualizar usuario (SUPER_ADMIN)
- `DELETE /api/users/:id` - Eliminar usuario (SUPER_ADMIN)

### Admin - Contactos (requiere autenticación)
- `GET /api/admin/contacts` - Listar contactos
- `GET /api/admin/contacts/stats` - Estadísticas
- `PATCH /api/admin/contacts/:id/read` - Marcar como leído
- `DELETE /api/admin/contacts/:id` - Eliminar contacto

### Admin - Portfolio (requiere autenticación)
- `GET /api/admin/portfolio` - Listar todos los proyectos
- `POST /api/admin/portfolio` - Crear proyecto
- `PATCH /api/admin/portfolio/:id` - Actualizar proyecto
- `DELETE /api/admin/portfolio/:id` - Eliminar proyecto
- `PATCH /api/admin/portfolio/:id/toggle-published` - Publicar/despublicar
- `PATCH /api/admin/portfolio/:id/toggle-featured` - Destacar/quitar

## 🔒 Roles y Permisos

- **SUPER_ADMIN**: Acceso completo (gestión de usuarios, contactos, proyectos)
- **ADMIN**: Acceso a contactos y proyectos (sin gestión de usuarios)

## 🌍 Variables de Entorno

Ver `.env.example` para todas las variables disponibles:
- `DATABASE_URL` - Conexión a MySQL
- `JWT_SECRET` - Secreto para tokens JWT
- `PORT` - Puerto del servidor (default: 3000)
- `SMTP_*` - Configuración de email (opcional)
- `CORS_ORIGIN` - Orígenes permitidos para CORS

## 🚨 Solución de Problemas

### Error de conexión a MySQL
```bash
# Verificar que MySQL está corriendo
# Verificar credenciales en DATABASE_URL
# Verificar que la base de datos existe
```

### Prisma Client no generado
```bash
npm run prisma:generate
```

### Migraciones pendientes
```bash
npm run prisma:migrate
```

## 📝 Notas de Desarrollo

- El servidor corre por defecto en `http://localhost:3000`
- Los archivos subidos se guardan en `/uploads`
- Los logs de desarrollo muestran las queries SQL
- Swagger UI está disponible en `/api/docs`

## 🤝 Contribuir

1. Crear una rama para tu feature
2. Hacer commits con mensajes descriptivos
3. Crear un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.
