# CRUD de Tareas (Node.js + Express)

Proyecto de la Tarea 3 de Programación III, desarrollado con **Git Flow**.

## Ejecutar

```bash
npm install
npm start
```

Abrir http://localhost:3000

## Ramas

- `main`: producción
- `qa`: pruebas
- `dev`: integración
- `feature/*`: una rama por funcionalidad

## Endpoints
- `POST /api/tareas`: crear una tarea
- `GET /api/tareas`: listar tareas
- `GET /api/tareas/:id`: obtener una tarea
- `PUT /api/tareas/:id`: editar una tarea
- `DELETE /api/tareas/:id`: eliminar una tarea
- Interfaz web en `/` para crear, listar, editar y eliminar tareas
