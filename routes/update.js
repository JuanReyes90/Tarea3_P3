const express = require('express');
const store = require('../store');

const router = express.Router();

// PUT /api/tareas/:id -> actualizar una tarea
router.put('/:id', (req, res) => {
  const tareas = store.load();
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

  const { titulo, descripcion, completada } = req.body || {};
  if (titulo !== undefined) {
    if (!String(titulo).trim()) {
      return res.status(400).json({ error: 'El título no puede estar vacío' });
    }
    tarea.titulo = String(titulo).trim();
  }
  if (descripcion !== undefined) tarea.descripcion = String(descripcion);
  if (completada !== undefined) tarea.completada = Boolean(completada);

  store.save(tareas);
  res.json(tarea);
});

module.exports = router;
