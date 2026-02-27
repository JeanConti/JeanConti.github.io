# Guía Paso a Paso: Instalación de XAMPP y Configuración de MySQL

## 📥 Paso 1: Descargar XAMPP

1. ✅ Abre la página de XAMPP: https://www.apachefriends.org/
2. Haz clic en el botón de descarga para Windows
3. Descarga la versión más reciente (aproximadamente 150 MB)

## 🔧 Paso 2: Instalar XAMPP

1. Ejecuta el instalador descargado (`xampp-windows-x64-installer.exe`)
2. Si aparece un aviso de UAC (Control de Cuentas de Usuario), haz clic en "Sí"
3. Si aparece advertencia sobre antivirus, haz clic en "OK"
4. En el asistente de instalación:
   - **Select Components**: Asegúrate de que "MySQL" esté seleccionado ✅
   - **Installation folder**: Deja la ruta por defecto `C:\xampp`
   - **Language**: Selecciona tu idioma preferido
5. Haz clic en "Next" hasta completar la instalación
6. Al finalizar, marca "Do you want to start the Control Panel now?" y haz clic en "Finish"

## 🚀 Paso 3: Iniciar MySQL en XAMPP

1. Se abrirá el **XAMPP Control Panel**
2. Busca la fila que dice "MySQL"
3. Haz clic en el botón **"Start"** en la fila de MySQL
4. Espera a que el fondo se ponga verde y diga "Running"
5. ✅ MySQL ahora está corriendo en el puerto 3306

## 🗄️ Paso 4: Crear la Base de Datos

### Opción A: Usando phpMyAdmin (Recomendado - Interfaz Gráfica)

1. En el XAMPP Control Panel, haz clic en el botón **"Admin"** en la fila de MySQL
2. Se abrirá phpMyAdmin en tu navegador (http://localhost/phpmyadmin)
3. Haz clic en la pestaña **"Databases"** (Bases de datos)
4. En "Create database" (Crear base de datos):
   - Nombre: `portfolio_db`
   - Cotejamiento: Selecciona `utf8mb4_unicode_ci`
5. Haz clic en **"Create"** (Crear)
6. ✅ La base de datos `portfolio_db` ha sido creada

### Opción B: Usando SQL (Avanzado)

1. En phpMyAdmin, haz clic en la pestaña "SQL"
2. Pega este comando:
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Haz clic en "Go"

## ⚙️ Paso 5: Verificar Configuración del .env

El archivo `.env` ya está configurado para XAMPP:
```
DATABASE_URL="mysql://root:@localhost:3306/portfolio_db"
```

**Nota**: XAMPP por defecto no tiene contraseña para el usuario `root`, por eso la URL tiene `root:@` (sin contraseña después de los dos puntos).

## ✅ Paso 6: Verificar que Todo Funciona

Ejecuta estos comandos en orden:

```bash
# 1. Generar Prisma Client
npm run prisma:generate

# 2. Crear las tablas en la base de datos
npm run prisma:migrate

# 3. Poblar con datos iniciales
npm run prisma:seed

# 4. Iniciar el servidor
npm run start:dev
```

## 🔍 Solución de Problemas

### MySQL no inicia en XAMPP
- **Puerto ocupado**: Otro servicio está usando el puerto 3306
  - Solución: Detén otros servicios MySQL o cambia el puerto en XAMPP
- **Falta de permisos**: Ejecuta XAMPP como administrador
  - Solución: Clic derecho en XAMPP Control Panel → "Ejecutar como administrador"

### Error: "Can't connect to MySQL server"
- Verifica que MySQL esté corriendo (fondo verde en XAMPP)
- Verifica que el puerto sea 3306 en XAMPP Config

### Error: "Access denied for user 'root'"
- XAMPP por defecto no tiene contraseña
- Si configuraste una contraseña, actualiza el .env:
  ```
  DATABASE_URL="mysql://root:tu_password@localhost:3306/portfolio_db"
  ```

## 📝 Notas Importantes

- **XAMPP debe estar corriendo**: Cada vez que reinicies tu PC, debes abrir XAMPP Control Panel y hacer clic en "Start" para MySQL
- **Puerto por defecto**: MySQL en XAMPP usa el puerto 3306
- **Usuario por defecto**: `root` sin contraseña
- **phpMyAdmin**: Accesible en http://localhost/phpmyadmin cuando Apache y MySQL están corriendo

## 🎯 Próximos Pasos

Una vez completados estos pasos:
1. ✅ XAMPP instalado
2. ✅ MySQL corriendo
3. ✅ Base de datos `portfolio_db` creada
4. ⏭️ Ejecutar migraciones de Prisma
5. ⏭️ Poblar datos iniciales
6. ⏭️ Iniciar el servidor de desarrollo

---

**¿Listo para continuar?** Avísame cuando hayas completado estos pasos y procederemos con las migraciones.
