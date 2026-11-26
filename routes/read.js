const express = require('express');
const store = require('../store');

const router = express.Router();

// GET /api/tareas -> listar todas
router.get('/', (req, res) => {
  res.json(store.load());
});

// GET /api/tareas/:id -> obtener una
router.get('/:id', (req, res) => {
  const tarea = store.load().find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(tarea);
});

module.exports = router;
