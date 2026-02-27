# Guía de Configuración con MAMP

## 🚀 Paso 1: Iniciar MAMP

1. Abre **MAMP** (no MAMP PRO, solo MAMP)
2. Haz clic en el botón **"Start Servers"** o **"Iniciar Servidores"**
3. Espera a que los indicadores de Apache y MySQL se pongan verdes
4. ✅ MySQL está corriendo (por defecto en puerto **8889** en MAMP)

## 🗄️ Paso 2: Crear la Base de Datos

### Opción A: Usando phpMyAdmin (Recomendado)

1. En MAMP, haz clic en **"Open WebStart page"** o **"Abrir página de inicio"**
2. En la página que se abre, haz clic en **"Tools" → "phpMyAdmin"**
   - O accede directamente a: http://localhost:8888/phpMyAdmin/ (o el puerto que uses)
3. Haz clic en la pestaña **"Databases"** (Bases de datos)
4. En "Create database":
   - Nombre: `portfolio_db`
   - Cotejamiento: `utf8mb4_unicode_ci`
5. Haz clic en **"Create"**
6. ✅ Base de datos creada

### Opción B: Usando SQL

1. En phpMyAdmin, haz clic en la pestaña "SQL"
2. Pega este comando:
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Haz clic en "Go"

## ⚙️ Paso 3: Verificar Configuración

### Credenciales por defecto de MAMP:
- **Usuario**: `root`
- **Contraseña**: `root` (en MAMP, a diferencia de XAMPP)
- **Puerto MySQL**: `8889` (por defecto en MAMP)
- **Host**: `localhost` o `127.0.0.1`

### Configuración del .env (ya actualizada):
```env
DATABASE_URL="mysql://root:root@localhost:8889/portfolio_db"
```

**Nota importante**: MAMP usa el puerto **8889** por defecto, no el 3306 estándar.

## 🔍 Verificar Puerto de MySQL en MAMP

Si tienes dudas sobre el puerto:

1. Abre MAMP
2. Haz clic en **"Preferences"** o **"Preferencias"**
3. Ve a la pestaña **"Ports"**
4. Verifica el **"MySQL Port"**:
   - Por defecto: `8889`
   - Si es diferente, actualiza el `.env` con ese puerto

## ✅ Paso 4: Ejecutar Migraciones

Una vez creada la base de datos, ejecuta estos comandos:

```bash
# 1. Generar Prisma Client
npm run prisma:generate

# 2. Crear las tablas en la base de datos
npm run prisma:migrate

# 3. Poblar con datos iniciales (usuario admin, proyectos de ejemplo)
npm run prisma:seed

# 4. Iniciar el servidor de desarrollo
npm run start:dev
```

## 🔧 Solución de Problemas

### Error: "Can't connect to MySQL server"
- **Verifica que MAMP esté corriendo**: Los indicadores deben estar verdes
- **Verifica el puerto**: Por defecto es 8889, no 3306
- **Verifica la contraseña**: En MAMP es `root`, no vacía

### Error: "Access denied for user 'root'@'localhost'"
- La contraseña por defecto en MAMP es `root`
- Verifica que el `.env` tenga: `mysql://root:root@localhost:8889/portfolio_db`

### Error: "Unknown database 'portfolio_db'"
- Asegúrate de haber creado la base de datos en phpMyAdmin
- El nombre debe ser exactamente `portfolio_db` (minúsculas)

### Puerto diferente
Si MAMP usa un puerto diferente (por ejemplo 3306):
```env
DATABASE_URL="mysql://root:root@localhost:3306/portfolio_db"
```

## 📝 Notas Importantes

- **MAMP debe estar corriendo**: Cada vez que trabajes en el proyecto, asegúrate de que MAMP esté iniciado
- **Puerto por defecto**: 8889 (diferente a MySQL estándar que es 3306)
- **Credenciales**: Usuario `root`, Contraseña `root`
- **phpMyAdmin**: Accesible desde la página de inicio de MAMP

## 🎯 Checklist

- [ ] MAMP instalado y abierto
- [ ] Servidores iniciados (indicadores verdes)
- [ ] Base de datos `portfolio_db` creada en phpMyAdmin
- [ ] Archivo `.env` configurado con puerto 8889
- [ ] Ejecutar `npm run prisma:generate`
- [ ] Ejecutar `npm run prisma:migrate`
- [ ] Ejecutar `npm run prisma:seed`
- [ ] Ejecutar `npm run start:dev`

---

**¿Listo para continuar?** Si MAMP está corriendo y la base de datos creada, podemos proceder con las migraciones.
