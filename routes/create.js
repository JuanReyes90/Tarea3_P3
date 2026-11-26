const express = require('express');
const store = require('../store');

const router = express.Router();

// POST /api/tareas -> crear una tarea
router.post('/', (req, res) => {
  const { titulo, descripcion = '' } = req.body || {};
  if (!titulo || !String(titulo).trim()) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }
  const tareas = store.load();
  const nueva = {
    id: store.nextId(tareas),
    titulo: String(titulo).trim(),
    descripcion: String(descripcion),
    completada: false,
  };
  tareas.push(nueva);
  store.save(tareas);
  res.status(201).json(nueva);
});

module.exports = router;
