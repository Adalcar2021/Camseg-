// -------------------------------------------
// DATOS GUARDADOS
// -------------------------------------------
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
let mantenimientos = JSON.parse(localStorage.getItem("mantenimientos")) || [];
let tecnicos = JSON.parse(localStorage.getItem("tecnicos")) || ["Carlos", "Ana"];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || ["admin"];

function guardar() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("equipos", JSON.stringify(equipos));
  localStorage.setItem("mantenimientos", JSON.stringify(mantenimientos));
  localStorage.setItem("tecnicos", JSON.stringify(tecnicos));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

const contenido = document.getElementById("contenido");


// -------------------------------------------
// INICIO
// -------------------------------------------
document.getElementById("btnInicio").addEventListener("click", () => {
  contenido.innerHTML = `
    <h2>Bienvenido a CAMSEG</h2>
    <p>Panel de control básico.</p>`;
});


// -------------------------------------------
// CLIENTES
// -------------------------------------------
document.getElementById("btnClientes").addEventListener("click", mostrarClientes);
document.getElementById("btnRegistrarCliente").addEventListener("click", registrarCliente);

function mostrarClientes() {
  contenido.innerHTML = `
    <h2>Clientes</h2>
    <ul class="list-group">
      ${clientes.map(c => `<li class="list-group-item">${c.nombre} — ${c.telefono}</li>`).join("")}
    </ul>`;
}

function registrarCliente() {
  contenido.innerHTML = `
    <h2>Registrar Cliente</h2>
    <form id="formCliente" class="card p-4">

      <input class="form-control mb-3" id="cNombre" placeholder="Nombre" required>
      <input class="form-control mb-3" id="cTelefono" placeholder="Teléfono" required>

      <button class="btn btn-primary" type="submit">Guardar</button>
    </form>
  `;

  document.getElementById("formCliente").onsubmit = (e) => {
    e.preventDefault();
    clientes.push({
      nombre: cNombre.value,
      telefono: cTelefono.value
    });
    guardar();
    mostrarClientes();
  };
}


// -------------------------------------------
// EQUIPOS
// -------------------------------------------
document.getElementById("btnEquipos").addEventListener("click", mostrarEquipos);
document.getElementById("btnRegistrarEquipo").addEventListener("click", registrarEquipo);

function mostrarEquipos() {
  contenido.innerHTML = `
    <h2>Equipos</h2>
    <ul class="list-group">
      ${equipos.map(e => `
        <li class="list-group-item">
          <strong>${e.nombre}</strong> — ${e.tipo}
          <br>Cliente: ${e.cliente}
        </li>`).join("")}
    </ul>`;
}

function registrarEquipo() {
  contenido.innerHTML = `
    <h2>Registrar Equipo</h2>
    <form id="formEquipo" class="card p-4">

      <input class="form-control mb-3" id="eNombre" placeholder="Nombre del equipo" required>
      <select class="form-select mb-3" id="eTipo">
        <option>Cámara</option>
        <option>DVR</option>
        <option>Sensor</option>
        <option>Alarma</option>
      </select>
      <select class="form-select mb-3" id="eCliente">
        ${clientes.map(c => `<option>${c.nombre}</option>`).join("")}
      </select>

      <button class="btn btn-primary" type="submit">Guardar</button>
    </form>
  `;

  document.getElementById("formEquipo").onsubmit = (e) => {
    e.preventDefault();
    equipos.push({
      nombre: eNombre.value,
      tipo: eTipo.value,
      cliente: eCliente.value
    });
    guardar();
    mostrarEquipos();
  };
}


// -------------------------------------------
// MANTENIMIENTOS
// -------------------------------------------
document.getElementById("btnMantenimientos").addEventListener("click", mostrarMantenimientos);
document.getElementById("btnRegistrarMantenimiento").addEventListener("click", registrarMantenimiento);

function mostrarMantenimientos() {
  contenido.innerHTML = `
    <h2>Mantenimientos</h2>
    <ul class="list-group">
      ${mantenimientos.map(m => `
        <li class="list-group-item">
          <strong>${m.tipo}</strong> — Cliente: ${m.cliente}
          <br>Técnico: ${m.tecnico}
          <br>Fecha: ${m.fecha}
        </li>`).join("")}
    </ul>`;
}

function registrarMantenimiento() {
  contenido.innerHTML = `
    <h2>Registrar Mantenimiento</h2>
    <form id="formMant" class="card p-4">

      <select class="form-select mb-3" id="mTipo">
        <option>Preventivo</option>
        <option>Correctivo</option>
      </select>

      <select class="form-select mb-3" id="mCliente">
        ${clientes.map(c => `<option>${c.nombre}</option>`).join("")}
      </select>

      <select class="form-select mb-3" id="mTecnico">
        ${tecnicos.map(t => `<option>${t}</option>`).join("")}
      </select>

      <input class="form-control mb-3" type="date" id="mFecha">

      <button class="btn btn-primary" type="submit">Guardar</button>
    </form>
  `;

  document.getElementById("formMant").onsubmit = (e) => {
    e.preventDefault();
    mantenimientos.push({
      tipo: mTipo.value,
      cliente: mCliente.value,
      tecnico: mTecnico.value,
      fecha: mFecha.value
    });
    guardar();
    mostrarMantenimientos();
  };
}


// -------------------------------------------
// TÉCNICOS
// -------------------------------------------
document.getElementById("btnTecnicos").addEventListener("click", mostrarTecnicos);

function mostrarTecnicos() {
  contenido.innerHTML = `
    <h2>Técnicos</h2>
    <ul class="list-group mb-3">
      ${tecnicos.map(t => `<li class="list-group-item">${t}</li>`).join("")}
    </ul>

    <input class="form-control mb-2" id="nuevoTecnico" placeholder="Nuevo técnico">
    <button class="btn btn-success" id="agregarTecnico">Agregar</button>
  `;

  document.getElementById("agregarTecnico").onclick = () => {
    tecnicos.push(nuevoTecnico.value);
    guardar();
    mostrarTecnicos();
  };
}


// -------------------------------------------
// USUARIOS / ADMIN
// -------------------------------------------
document.getElementById("btnUsuarios").addEventListener("click", mostrarUsuarios);

function mostrarUsuarios() {
  contenido.innerHTML = `
    <h2>Usuarios</h2>
    <ul class="list-group mb-3">
      ${usuarios.map(u => `<li class="list-group-item">${u}</li>`).join("")}
    </ul>

    <input class="form-control mb-2" id="nuevoUsuario" placeholder="Nuevo usuario">
    <button class="btn btn-success" id="agregarUsuario">Agregar</button>
  `;

  document.getElementById("agregarUsuario").onclick = () => {
    usuarios.push(nuevoUsuario.value);
    guardar();
    mostrarUsuarios();
  };
}
