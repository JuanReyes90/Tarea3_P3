const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Carga automáticamente cada archivo de /routes.
// Cada feature agrega su propio archivo de rutas.
const routesDir = path.join(__dirname, 'routes');
if (fs.existsSync(routesDir)) {
  fs.readdirSync(routesDir)
    .filter((f) => f.endsWith('.js'))
    .forEach((f) => app.use('/api/tareas', require(path.join(routesDir, f))));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
