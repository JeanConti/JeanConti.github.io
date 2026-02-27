# Guía de Instalación de MySQL para Windows

## Opción 1: Instalar MySQL Community Server (Recomendado)

### Descarga e Instalación
1. Descargar MySQL Community Server desde: https://dev.mysql.com/downloads/mysql/
2. Ejecutar el instalador (mysql-installer-community)
3. Seleccionar "Developer Default" o "Server only"
4. Durante la instalación:
   - Configurar contraseña para el usuario `root` (o dejarla vacía)
   - Puerto por defecto: 3306
   - Iniciar MySQL como servicio de Windows

### Crear la Base de Datos
Abrir MySQL Command Line Client o MySQL Workbench y ejecutar:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Configurar .env
Si tienes contraseña:
```
DATABASE_URL="mysql://root:tu_password@localhost:3306/portfolio_db"
```

Si NO tienes contraseña:
```
DATABASE_URL="mysql://root:@localhost:3306/portfolio_db"
```

---

## Opción 2: Usar XAMPP (Más fácil para desarrollo)

### Instalación
1. Descargar XAMPP desde: https://www.apachefriends.org/
2. Instalar XAMPP
3. Abrir XAMPP Control Panel
4. Iniciar el módulo "MySQL"

### Crear la Base de Datos
1. Abrir phpMyAdmin: http://localhost/phpmyadmin
2. Crear nueva base de datos llamada `portfolio_db`
3. Seleccionar cotejamiento: `utf8mb4_unicode_ci`

### Configurar .env
```
DATABASE_URL="mysql://root:@localhost:3306/portfolio_db"
```

---

## Opción 3: Usar Docker (Para usuarios avanzados)

### Crear contenedor MySQL
```bash
docker run --name portfolio-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=portfolio_db -p 3306:3306 -d mysql:8.0
```

### Configurar .env
```
DATABASE_URL="mysql://root:password@localhost:3306/portfolio_db"
```

---

## Verificar Conexión

Una vez instalado MySQL y creada la base de datos, ejecutar:

```bash
# Generar Prisma Client
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Poblar datos iniciales
npm run prisma:seed
```

---

## Solución de Problemas

### Error: "Can't connect to MySQL server"
- Verificar que MySQL está corriendo
- En XAMPP: Iniciar el módulo MySQL
- En Windows Services: Verificar que el servicio MySQL está activo

### Error: "Access denied for user"
- Verificar usuario y contraseña en DATABASE_URL
- Usuario por defecto es `root`
- Contraseña por defecto en XAMPP es vacía

### Error: "Unknown database"
- Crear la base de datos `portfolio_db` manualmente
- Usar phpMyAdmin o MySQL Workbench

---

## Próximos Pasos

Después de configurar MySQL:

1. ✅ Verificar que MySQL está corriendo
2. ✅ Crear base de datos `portfolio_db`
3. ✅ Configurar DATABASE_URL en .env
4. ⏭️ Ejecutar: `npm run prisma:generate`
5. ⏭️ Ejecutar: `npm run prisma:migrate`
6. ⏭️ Ejecutar: `npm run prisma:seed`
7. ⏭️ Ejecutar: `npm run start:dev`
