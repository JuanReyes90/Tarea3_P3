// Persistencia sencilla en un archivo JSON (data/tareas.json)
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const FILE = path.join(DATA_DIR, 'tareas.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function save(tareas) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(tareas, null, 2));
}

function nextId(tareas) {
  return tareas.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

module.exports = { load, save, nextId };
