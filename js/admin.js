/* ==========================================================
   BOL Store - Panel de administracion
   Muestra los listados de productos y usuarios, y valida los
   formularios de los mantenedores.

   Las funciones de ayuda (mostrarError, marcarBueno, valorDe,
   esRunValido, esCorreoValido) vienen de js/validaciones.js,
   que tambien se carga en estas paginas. Asi no se repite
   codigo entre la tienda y el administrador.
   ========================================================== */

/* ----- Rol del usuario conectado -----
   El proyecto define tres roles. El Vendedor solo puede ver
   los listados de productos, asi que las opciones que no le
   corresponden se ocultan del menu lateral. */

function obtenerRol() {
  var guardado = localStorage.getItem("rol");
  if (guardado == null) {
    return "Administrador";
  }
  return guardado;
}

function cambiarRol() {
  var lista = document.getElementById("selector-rol");
  localStorage.setItem("rol", lista.value);
  location.reload();
}

// Oculta del menu lo que el rol actual no puede ver
function aplicarPermisos() {
  var rol = obtenerRol();
  var etiqueta = document.getElementById("rol-actual");

  if (etiqueta != null) {
    etiqueta.innerHTML = rol;
  }

  var selector = document.getElementById("selector-rol");
  if (selector != null) {
    selector.value = rol;
  }

  // El vendedor no administra usuarios ni crea productos
  if (rol == "Vendedor") {
    var restringidos = document.getElementsByClassName("solo-admin");

    // Se recorre al reves porque la lista se acorta al ocultar
    for (var i = restringidos.length - 1; i >= 0; i--) {
      restringidos[i].style.display = "none";
    }
  }
}

/* ----- Resumen del home del administrador ----- */

function mostrarResumenAdmin() {
  var caja = document.getElementById("resumen-admin");

  if (caja == null) {
    return;
  }

  var sinStock = 0;
  var stockBajo = 0;
  var valorTotal = 0;

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];

    if (p.stock == 0) {
      sinStock = sinStock + 1;
    } else if (p.stock <= p.stockCritico) {
      stockBajo = stockBajo + 1;
    }

    valorTotal = valorTotal + p.precio * p.stock;
  }

  var html = "";

  html = html + '<div class="col-md-3"><div class="tarjeta-dato"><span class="numero">' + productos.length + "</span>Productos</div></div>";
  html = html + '<div class="col-md-3"><div class="tarjeta-dato"><span class="numero">' + usuarios.length + "</span>Usuarios</div></div>";
  html = html + '<div class="col-md-3"><div class="tarjeta-dato"><span class="numero">' + sinStock + "</span>Sin stock</div></div>";
  html = html + '<div class="col-md-3"><div class="tarjeta-dato"><span class="numero">' + stockBajo + "</span>Stock critico</div></div>";

  caja.innerHTML = html;

  var valor = document.getElementById("valor-inventario");
  if (valor != null) {
    valor.innerHTML = formatearPrecio(valorTotal);
  }
}

/* ----- Listado de productos ----- */

function mostrarTablaProductos() {
  var caja = document.getElementById("tabla-productos");

  if (caja == null) {
    return;
  }

  var rol = obtenerRol();
  var html = "";

  html = html + '<table class="tabla-admin">';
  html = html + "<thead><tr>";
  html = html + "<th>Codigo</th><th>Producto</th><th>Categoria</th>";
  html = html + "<th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th>";
  html = html + "</tr></thead><tbody>";

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];

    // Estado del stock segun el stock critico definido en el producto
    var estado = '<span class="etiqueta etiqueta-ok">Disponible</span>';

    if (p.stock == 0) {
      estado = '<span class="etiqueta etiqueta-malo">Sin stock</span>';
    } else if (p.stock <= p.stockCritico) {
      estado = '<span class="etiqueta etiqueta-alerta">Stock critico</span>';
    }

    html = html + "<tr>";
    html = html + "<td>" + p.codigo + "</td>";
    html = html + "<td>" + p.nombre + "</td>";
    html = html + "<td>" + p.categoria + "</td>";
    html = html + "<td>" + formatearPrecio(p.precio) + "</td>";
    html = html + "<td>" + p.stock + "</td>";
    html = html + "<td>" + estado + "</td>";

    html = html + "<td>";
    if (rol == "Vendedor") {
      // El vendedor solo mira, no edita
      html = html + '<a class="boton-tabla" href="../detalle-producto.html?codigo=' + p.codigo + '">Ver</a>';
    } else {
      html = html + '<a class="boton-tabla" href="editar-producto.html?codigo=' + p.codigo + '">Editar</a> ';
      html = html + '<button class="boton-tabla boton-borrar" onclick="borrarProducto(\'' + p.codigo + '\')">Eliminar</button>';
    }
    html = html + "</td>";

    html = html + "</tr>";
  }

  html = html + "</tbody></table>";

  caja.innerHTML = html;
}

/* Muestra un aviso dentro del panel, sin ventanas emergentes */
function avisoAdmin(mensaje, tipo) {
  var caja = document.getElementById("aviso-admin");

  if (caja == null) {
    return;
  }

  caja.innerHTML = mensaje;

  if (tipo == "error") {
    caja.className = "aviso-tienda-malo";
  } else {
    caja.className = "aviso-tienda-bueno";
  }

  setTimeout(function () {
    caja.innerHTML = "";
    caja.className = "";
  }, 4000);
}

function borrarProducto(codigo) {
  var p = buscarProducto(codigo);

  if (confirm("Seguro que quieres eliminar " + p.nombre + "?")) {
    avisoAdmin("El producto " + p.nombre + " fue eliminado del catalogo.", "bueno");
  }
}

/* ----- Listado de usuarios ----- */

function mostrarTablaUsuarios() {
  var caja = document.getElementById("tabla-usuarios");

  if (caja == null) {
    return;
  }

  var html = "";

  html = html + '<table class="tabla-admin">';
  html = html + "<thead><tr>";
  html = html + "<th>RUN</th><th>Nombre</th><th>Correo</th>";
  html = html + "<th>Tipo</th><th>Comuna</th><th>Acciones</th>";
  html = html + "</tr></thead><tbody>";

  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];

    html = html + "<tr>";
    html = html + "<td>" + u.run + "</td>";
    html = html + "<td>" + u.nombre + " " + u.apellidos + "</td>";
    html = html + "<td>" + u.correo + "</td>";
    html = html + '<td><span class="etiqueta etiqueta-rol">' + u.tipo + "</span></td>";
    html = html + "<td>" + u.comuna + "</td>";
    html = html + '<td><a class="boton-tabla" href="editar-usuario.html?run=' + u.run + '">Editar</a> ';
    html = html + '<button class="boton-tabla boton-borrar" onclick="borrarUsuario(\'' + u.run + '\')">Eliminar</button></td>';
    html = html + "</tr>";
  }

  html = html + "</tbody></table>";

  caja.innerHTML = html;
}

function borrarUsuario(run) {
  var u = buscarUsuario(run);

  if (confirm("Seguro que quieres eliminar a " + u.nombre + " " + u.apellidos + "?")) {
    avisoAdmin("El usuario " + u.nombre + " " + u.apellidos + " fue eliminado del sistema.", "bueno");
  }
}

/* ==========================================================
   MANTENEDOR DE PRODUCTOS
   Codigo: requerido, texto, minimo 3, sin maximo
   Nombre: requerido, maximo 100
   Descripcion: opcional, maximo 500
   Precio: requerido, minimo 0, acepta decimales
   Stock: requerido, minimo 0, solo enteros
   Stock critico: opcional, minimo 0, solo enteros
   Categoria: requerida
   Imagen: opcional
   ========================================================== */

// Llena la lista de categorias a partir de los productos existentes
function cargarCategorias() {
  var lista = document.getElementById("categoria");

  if (lista == null) {
    return;
  }

  var encontradas = [];

  for (var i = 0; i < productos.length; i++) {
    var cat = productos[i].categoria;
    var repetida = false;

    for (var j = 0; j < encontradas.length; j++) {
      if (encontradas[j] == cat) {
        repetida = true;
      }
    }

    if (repetida == false) {
      encontradas.push(cat);
    }
  }

  var html = '<option value="">-- Seleccione la categoria --</option>';

  for (var i = 0; i < encontradas.length; i++) {
    html = html + '<option value="' + encontradas[i] + '">' + encontradas[i] + "</option>";
  }

  lista.innerHTML = html;
}

function validarCodigoProducto() {
  var codigo = valorDe("codigo");

  if (codigo == "") {
    return mostrarError("codigo", "Escribe el codigo del producto.");
  }
  if (codigo.length < 3) {
    return mostrarError("codigo", "El codigo debe tener al menos 3 caracteres. Escribiste " + codigo.length + ".");
  }

  return marcarBueno("codigo");
}

function validarNombreProducto() {
  var nombre = valorDe("nombre");

  if (nombre == "") {
    return mostrarError("nombre", "Escribe el nombre del producto.");
  }
  if (nombre.length > 100) {
    return mostrarError("nombre", "El nombre no puede tener mas de 100 caracteres.");
  }

  return marcarBueno("nombre");
}

function validarDescripcionProducto() {
  var descripcion = valorDe("descripcion");

  // Campo opcional: si esta vacio es valido
  if (descripcion == "") {
    return marcarBueno("descripcion");
  }
  if (descripcion.length > 500) {
    return mostrarError("descripcion", "La descripcion no puede tener mas de 500 caracteres.");
  }

  return marcarBueno("descripcion");
}

function validarPrecio() {
  var texto = valorDe("precio");

  if (texto == "") {
    return mostrarError("precio", "Escribe el precio del producto.");
  }

  var precio = parseFloat(texto);

  if (isNaN(precio)) {
    return mostrarError("precio", "El precio debe ser un numero.");
  }
  if (precio < 0) {
    return mostrarError("precio", "El precio no puede ser negativo. Usa 0 si el producto es gratis.");
  }

  return marcarBueno("precio");
}

function validarStock() {
  var texto = valorDe("stock");

  if (texto == "") {
    return mostrarError("stock", "Escribe el stock disponible.");
  }

  var stock = parseFloat(texto);

  if (isNaN(stock)) {
    return mostrarError("stock", "El stock debe ser un numero.");
  }
  if (stock < 0) {
    return mostrarError("stock", "El stock no puede ser negativo.");
  }
  // Math.floor corta los decimales. Si el numero cambia, no era entero.
  if (stock != Math.floor(stock)) {
    return mostrarError("stock", "El stock debe ser un numero entero, sin decimales.");
  }

  return marcarBueno("stock");
}

function validarStockCritico() {
  var texto = valorDe("stockCritico");

  // Campo opcional
  if (texto == "") {
    return marcarBueno("stockCritico");
  }

  var critico = parseFloat(texto);

  if (isNaN(critico)) {
    return mostrarError("stockCritico", "El stock critico debe ser un numero.");
  }
  if (critico < 0) {
    return mostrarError("stockCritico", "El stock critico no puede ser negativo.");
  }
  if (critico != Math.floor(critico)) {
    return mostrarError("stockCritico", "El stock critico debe ser un numero entero.");
  }

  // Regla propia: avisar si el critico supera al stock actual
  var stock = parseFloat(valorDe("stock"));
  if (isNaN(stock) == false && critico > stock) {
    return mostrarError("stockCritico", "El stock critico es mayor que el stock actual. El producto quedara siempre en alerta.");
  }

  return marcarBueno("stockCritico");
}

function validarCategoria() {
  var categoria = valorDe("categoria");

  if (categoria == "") {
    return mostrarError("categoria", "Selecciona una categoria.");
  }

  return marcarBueno("categoria");
}

function validarFormularioProducto() {
  var ok1 = validarCodigoProducto();
  var ok2 = validarNombreProducto();
  var ok3 = validarDescripcionProducto();
  var ok4 = validarPrecio();
  var ok5 = validarStock();
  var ok6 = validarStockCritico();
  var ok7 = validarCategoria();

  var aviso = document.getElementById("aviso-formulario");

  if (ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7) {
    aviso.innerHTML = "El producto se guardo correctamente.";
    aviso.className = "mensaje-exito";
  } else {
    aviso.innerHTML = "Hay campos con errores. Revisa los que estan marcados en rojo.";
    aviso.className = "mensaje-error";
  }

  return false;
}

// En la vista de editar, se rellenan los campos con el producto pedido
function cargarProductoEnFormulario() {
  var caja = document.getElementById("codigo");

  if (caja == null) {
    return;
  }

  var codigo = obtenerParametro("codigo");

  if (codigo == null) {
    return;
  }

  var p = buscarProducto(codigo);

  if (p == null) {
    document.getElementById("aviso-formulario").innerHTML = "El producto no existe.";
    document.getElementById("aviso-formulario").className = "mensaje-error";
    return;
  }

  document.getElementById("codigo").value = p.codigo;
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("descripcion").value = p.descripcion;
  document.getElementById("precio").value = p.precio;
  document.getElementById("stock").value = p.stock;
  document.getElementById("stockCritico").value = p.stockCritico;
  document.getElementById("categoria").value = p.categoria;

  var titulo = document.getElementById("titulo-editar");
  if (titulo != null) {
    titulo.innerHTML = "Editar producto: " + p.nombre;
  }

  var vista = document.getElementById("imagen-actual");
  if (vista != null) {
    vista.innerHTML = '<img src="../' + p.imagen + '" alt="' + p.nombre + '" width="600" height="600">';
  }
}

/* ==========================================================
   MANTENEDOR DE USUARIOS
   Usa las mismas reglas del registro de la tienda, mas el
   campo Tipo de Usuario que solo existe en el administrador.
   ========================================================== */

function cargarTipos() {
  var lista = document.getElementById("tipo");

  if (lista == null) {
    return;
  }

  var html = '<option value="">-- Seleccione el tipo --</option>';

  for (var i = 0; i < tiposUsuario.length; i++) {
    html = html + '<option value="' + tiposUsuario[i] + '">' + tiposUsuario[i] + "</option>";
  }

  lista.innerHTML = html;
}

function validarTipo() {
  var tipo = valorDe("tipo");

  if (tipo == "") {
    return mostrarError("tipo", "Selecciona el tipo de usuario.");
  }

  return marcarBueno("tipo");
}

function validarFormularioUsuario() {
  var ok1 = validarRun();
  var ok2 = validarNombre();
  var ok3 = validarApellidos();
  var ok4 = validarCorreoRegistro();
  var ok5 = validarTipo();
  var ok6 = validarRegion();
  var ok7 = validarComuna();
  var ok8 = validarDireccion();

  var aviso = document.getElementById("aviso-formulario");

  if (ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7 && ok8) {
    aviso.innerHTML = "El usuario se guardo correctamente.";
    aviso.className = "mensaje-exito";
  } else {
    aviso.innerHTML = "Hay campos con errores. Revisa los que estan marcados en rojo.";
    aviso.className = "mensaje-error";
  }

  return false;
}

// En la vista de editar, se rellenan los campos con el usuario pedido
function cargarUsuarioEnFormulario() {
  var caja = document.getElementById("run");

  if (caja == null) {
    return;
  }

  var run = obtenerParametro("run");

  if (run == null) {
    return;
  }

  var u = buscarUsuario(run);

  if (u == null) {
    document.getElementById("aviso-formulario").innerHTML = "El usuario no existe.";
    document.getElementById("aviso-formulario").className = "mensaje-error";
    return;
  }

  document.getElementById("run").value = u.run;
  document.getElementById("nombre").value = u.nombre;
  document.getElementById("apellidos").value = u.apellidos;
  document.getElementById("correo").value = u.correo;
  document.getElementById("tipo").value = u.tipo;
  document.getElementById("direccion").value = u.direccion;
  document.getElementById("fecha").value = u.fechaNacimiento;

  // Primero se elige la region, despues se cargan sus comunas
  document.getElementById("region").value = u.region;
  cambiarComunas();
  document.getElementById("comuna").value = u.comuna;

  var titulo = document.getElementById("titulo-editar");
  if (titulo != null) {
    titulo.innerHTML = "Editar usuario: " + u.nombre + " " + u.apellidos;
  }
}

/* ----- Arranque del panel -----
   No se usa window.onload aqui porque main.js ya lo ocupa.
   Esta funcion la llama main.js solo si existe, o sea solo
   cuando la pagina cargo tambien este archivo. */

function iniciarAdmin() {
  aplicarPermisos();
  mostrarResumenAdmin();
  mostrarTablaProductos();
  mostrarTablaUsuarios();
  cargarCategorias();
  cargarTipos();
  cargarProductoEnFormulario();
  cargarUsuarioEnFormulario();
}
