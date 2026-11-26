const API = '/api/tareas';
const lista = document.getElementById('lista');
const form = document.getElementById('form');
const inputId = document.getElementById('id');
const inputTitulo = document.getElementById('titulo');
const inputDescripcion = document.getElementById('descripcion');
const btnGuardar = document.getElementById('guardar');
const btnCancelar = document.getElementById('cancelar');

function crearBoton(texto, clase, onClick) {
  const b = document.createElement('button');
  b.textContent = texto;
  if (clase) b.className = clase;
  b.addEventListener('click', onClick);
  return b;
}

async function cargar() {
  const res = await fetch(API);
  const tareas = await res.json();
  lista.innerHTML = '';
  tareas.forEach((t) => {
    const li = document.createElement('li');
    if (t.completada) li.classList.add('hecha');

    const texto = document.createElement('span');
    texto.textContent = t.titulo + (t.descripcion ? ' — ' + t.descripcion : '');

    const acciones = document.createElement('div');
    acciones.append(
      crearBoton(t.completada ? 'Reabrir' : 'Completar', 'secundario', () => alternar(t)),
      crearBoton('Editar', '', () => editar(t)),
      crearBoton('Eliminar', 'peligro', () => eliminar(t.id))
    );

    li.append(texto, acciones);
    lista.appendChild(li);
  });
}

async function alternar(t) {
  await fetch(`${API}/${t.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completada: !t.completada }),
  });
  cargar();
}

function editar(t) {
  inputId.value = t.id;
  inputTitulo.value = t.titulo;
  inputDescripcion.value = t.descripcion;
  btnGuardar.textContent = 'Guardar cambios';
  btnCancelar.hidden = false;
  inputTitulo.focus();
}

async function eliminar(id) {
  if (!confirm('¿Eliminar esta tarea?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  cargar();
}

function reiniciarFormulario() {
  form.reset();
  inputId.value = '';
  btnGuardar.textContent = 'Agregar';
  btnCancelar.hidden = true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const datos = { titulo: inputTitulo.value, descripcion: inputDescripcion.value };
  const editando = inputId.value;
  await fetch(editando ? `${API}/${editando}` : API, {
    method: editando ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  reiniciarFormulario();
  cargar();
});

btnCancelar.addEventListener('click', reiniciarFormulario);

cargar();
