const express = require('express');
const store = require('../store');

const router = express.Router();

// DELETE /api/tareas/:id -> eliminar una tarea
router.delete('/:id', (req, res) => {
  const tareas = store.load();
  const indice = tareas.findIndex((t) => t.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  tareas.splice(indice, 1);
  store.save(tareas);
  res.status(204).end();
});

module.exports = router;
