/* ==========================================================
   BOL Store - Script principal
   Muestra los productos en las distintas paginas y controla
   el carrito de compras.
   ========================================================== */

/* ----- Leer datos desde la direccion web ----- */

// Sirve para saber que producto o que categoria pidio el usuario.
// Ejemplo: en "detalle-producto.html?codigo=POL-001"
// obtenerParametro("codigo") devuelve "POL-001".
function obtenerParametro(nombre) {
  var direccion = new URLSearchParams(window.location.search);
  return direccion.get(nombre);
}

/* ----- Carrito guardado en localStorage ----- */

// El carrito se guarda como texto en localStorage con la llave "carrito".
// Adentro va una lista tipo: [{codigo: "POL-001", cantidad: 2}]

function obtenerCarrito() {
  var guardado = localStorage.getItem("carrito");
  if (guardado == null) {
    return [];
  }
  return JSON.parse(guardado);
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarContador();
}

// Suma cuantas unidades hay en total dentro del carrito
function contarProductos() {
  var carrito = obtenerCarrito();
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad;
  }
  return total;
}

// Escribe el numero en el contador que esta en el encabezado
function mostrarContador() {
  var contador = document.getElementById("contador-carrito");
  if (contador != null) {
    contador.innerHTML = contarProductos();
  }
}

// Busca un producto en el arreglo segun su codigo
function buscarProducto(codigo) {
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].codigo == codigo) {
      return productos[i];
    }
  }
  return null;
}

// Agrega un producto al carrito revisando que haya stock
function agregarAlCarrito(codigo, cantidad) {
  // Si no llega la cantidad, se agrega una sola unidad
  if (cantidad == undefined) {
    cantidad = 1;
  }

  var producto = buscarProducto(codigo);

  if (producto == null) {
    alert("El producto no existe.");
    return;
  }

  if (producto.stock == 0) {
    alert("Este producto esta sin stock.");
    return;
  }

  var carrito = obtenerCarrito();
  var encontrado = false;

  // Si el producto ya estaba, solo se le suma la cantidad
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo == codigo) {
      if (carrito[i].cantidad + cantidad > producto.stock) {
        alert("Solo quedan " + producto.stock + " unidades de este producto.");
        return;
      }
      carrito[i].cantidad = carrito[i].cantidad + cantidad;
      encontrado = true;
    }
  }

  // Si no estaba, se agrega como producto nuevo
  if (encontrado == false) {
    if (cantidad > producto.stock) {
      alert("Solo quedan " + producto.stock + " unidades de este producto.");
      return;
    }
    carrito.push({ codigo: codigo, cantidad: cantidad });
  }

  guardarCarrito(carrito);
  alert(producto.nombre + " se agrego al carrito.");
}

/* ----- Tarjeta de producto ----- */

// Arma el HTML de una tarjeta. Se usa en la home, en productos
// y en los productos relacionados, para no repetir el mismo codigo.
function crearTarjeta(p) {
  var html = "";

  html = html + '<article class="col-6 col-md-3">';
  html = html + '<div class="producto">';
  html = html + '<a href="detalle-producto.html?codigo=' + p.codigo + '">';
  html = html + '<img src="' + p.imagen + '" alt="' + p.nombre + '" width="600" height="600">';
  html = html + "</a>";
  html = html + "<h3>" + p.nombre + "</h3>";
  html = html + '<p class="categoria">' + p.categoria + "</p>";
  html = html + '<p class="precio">' + formatearPrecio(p.precio) + "</p>";

  if (p.stock == 0) {
    html = html + '<p class="agotado">Sin stock</p>';
  } else {
    html = html + '<button class="boton" onclick="agregarAlCarrito(\'' + p.codigo + '\')">Anadir</button>';
  }

  html = html + "</div>";
  html = html + "</article>";

  return html;
}

/* ----- Pagina de inicio: productos destacados ----- */

function mostrarDestacados() {
  var caja = document.getElementById("lista-destacados");

  // Si no estamos en la pagina de inicio, esta caja no existe
  if (caja == null) {
    return;
  }

  var html = "";

  for (var i = 0; i < productos.length; i++) {
    if (productos[i].destacado == true) {
      html = html + crearTarjeta(productos[i]);
    }
  }

  caja.innerHTML = html;
}

/* ----- Pagina de productos: listado con filtro ----- */

function mostrarTodosLosProductos() {
  var caja = document.getElementById("lista-productos");

  if (caja == null) {
    return;
  }

  // Categoria pedida en la direccion web. Si no viene, se muestran todos.
  var categoria = obtenerParametro("categoria");
  var html = "";
  var encontrados = 0;

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];

    if (categoria == null || p.categoria == categoria) {
      html = html + crearTarjeta(p);
      encontrados = encontrados + 1;
    }
  }

  if (encontrados == 0) {
    html = "<p>No hay productos en esta categoria.</p>";
  }

  caja.innerHTML = html;

  // Cambiar el titulo segun la categoria elegida
  var titulo = document.getElementById("titulo-productos");
  if (titulo != null && categoria != null) {
    titulo.innerHTML = categoria;
  }

  // Marcar el filtro que esta activo
  var filtros = document.getElementsByClassName("filtro");
  for (var i = 0; i < filtros.length; i++) {
    if (filtros[i].innerHTML == categoria) {
      filtros[i].className = "filtro filtro-activo";
    }
    if (categoria == null && filtros[i].innerHTML == "Todos") {
      filtros[i].className = "filtro filtro-activo";
    }
  }
}

/* ----- Pagina de detalle del producto ----- */

function mostrarDetalle() {
  var caja = document.getElementById("detalle");

  if (caja == null) {
    return;
  }

  var codigo = obtenerParametro("codigo");
  var p = buscarProducto(codigo);

  // Si el codigo no existe o viene vacio, se avisa al usuario
  if (p == null) {
    caja.innerHTML =
      "<h2>Producto no encontrado</h2>" +
      "<p>El producto que buscas no existe o fue retirado.</p>" +
      '<a class="boton" href="productos.html">Volver a productos</a>';
    return;
  }

  // Nombre del producto en la ruta de navegacion y en la pestana
  document.getElementById("miga-nombre").innerHTML = p.nombre;
  document.title = p.nombre + " - BOL Store";

  var html = "";

  html = html + '<div class="row">';

  // Columna de la imagen
  html = html + '<div class="col-md-6">';
  html = html + '<img id="imagen-detalle" src="' + p.imagen + '" alt="' + p.nombre + '" width="600" height="600">';
  html = html + "</div>";

  // Columna de la informacion
  html = html + '<div class="col-md-6">';
  html = html + '<div id="ficha">';
  html = html + "<h2>" + p.nombre + "</h2>";
  html = html + '<p class="categoria">' + p.categoria + " - Codigo " + p.codigo + "</p>";
  html = html + '<p class="precio-detalle">' + formatearPrecio(p.precio) + "</p>";
  html = html + "<p>" + p.descripcion + "</p>";

  // Caracteristicas propias del producto
  html = html + "<h3>Caracteristicas</h3>";
  html = html + '<table id="tabla-caracteristicas">';
  html = html + "<tr><td>Talla</td><td>" + p.talla + "</td></tr>";
  html = html + "<tr><td>Material</td><td>" + p.material + "</td></tr>";
  html = html + "<tr><td>Detalle</td><td>" + p.detalle + "</td></tr>";
  html = html + "<tr><td>Stock</td><td>" + p.stock + " unidades</td></tr>";
  html = html + "</table>";

  if (p.stock == 0) {
    html = html + '<p class="agotado">Producto sin stock</p>';
  } else {
    // Aviso cuando quedan pocas unidades
    if (p.stock <= p.stockCritico) {
      html = html + '<p class="aviso-stock">Quedan pocas unidades</p>';
    }

    html = html + '<label for="cantidad">Cantidad:</label> ';
    html = html + '<input type="number" id="cantidad" value="1" min="1" max="' + p.stock + '">';
    html = html + "<br><br>";
    html = html + '<button class="boton" onclick="anadirDesdeDetalle(\'' + p.codigo + '\')">Anadir al carrito</button>';
  }

  html = html + "</div>";
  html = html + "</div>";
  html = html + "</div>";

  caja.innerHTML = html;

  mostrarRelacionados(p);
}

// Lee la cantidad escrita por el usuario y la manda al carrito
function anadirDesdeDetalle(codigo) {
  var campo = document.getElementById("cantidad");
  var cantidad = parseInt(campo.value);

  if (isNaN(cantidad) || cantidad < 1) {
    alert("La cantidad debe ser un numero mayor a cero.");
    return;
  }

  agregarAlCarrito(codigo, cantidad);
}

/* ----- Productos relacionados ----- */

// Muestra otros productos de la misma categoria, sin repetir el actual
function mostrarRelacionados(producto) {
  var caja = document.getElementById("lista-relacionados");

  if (caja == null) {
    return;
  }

  var html = "";

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];

    if (p.categoria == producto.categoria && p.codigo != producto.codigo) {
      html = html + crearTarjeta(p);
    }
  }

  if (html == "") {
    html = "<p>No hay otros productos de esta categoria.</p>";
  }

  caja.innerHTML = html;
}

/* ----- Pagina del carrito de compras ----- */

// Reglas de negocio del carrito:
// - Envio: $3.990. Es gratis si la compra supera los $50.000
// - Cupon BOL10: descuenta un 10% del total de los productos
// - Cupon BOL5000: descuenta $5.000 en compras sobre $50.000
// - No se puede agregar mas unidades que el stock disponible

var COSTO_ENVIO = 3990;
var MONTO_ENVIO_GRATIS = 50000;

// Guarda el cupon en localStorage para que no se pierda al recargar
function obtenerCupon() {
  var guardado = localStorage.getItem("cupon");
  if (guardado == null) {
    return "";
  }
  return guardado;
}

// Calcula cuanto descuenta el cupon segun el subtotal
function calcularDescuento(subtotal) {
  var cupon = obtenerCupon();

  if (cupon == "BOL10") {
    return Math.round(subtotal * 0.1);
  }

  if (cupon == "BOL5000" && subtotal >= MONTO_ENVIO_GRATIS) {
    return 5000;
  }

  return 0;
}

function mostrarCarrito() {
  var caja = document.getElementById("lista-carrito");

  if (caja == null) {
    return;
  }

  var carrito = obtenerCarrito();

  // Si el carrito esta vacio se muestra un mensaje en vez de la lista
  if (carrito.length == 0) {
    caja.innerHTML =
      '<div class="carrito-vacio">' +
      "<p>Todavia no tienes productos en el carrito.</p>" +
      '<a class="boton" href="productos.html">Ver productos</a>' +
      "</div>";
    document.getElementById("resumen-carrito").innerHTML = "";
    return;
  }

  var html = "";
  var subtotal = 0;

  for (var i = 0; i < carrito.length; i++) {
    var linea = carrito[i];
    var p = buscarProducto(linea.codigo);

    // Si el producto ya no existe en el catalogo, se salta
    if (p == null) {
      continue;
    }

    var totalLinea = p.precio * linea.cantidad;
    subtotal = subtotal + totalLinea;

    html = html + '<div class="linea-carrito">';
    html = html + '<div class="row">';

    html = html + '<div class="col-3">';
    html = html + '<img src="' + p.imagen + '" alt="' + p.nombre + '" width="600" height="600">';
    html = html + "</div>";

    html = html + '<div class="col-5">';
    html = html + "<h3>" + p.nombre + "</h3>";
    html = html + '<p class="categoria">' + p.categoria + "</p>";
    html = html + '<p class="categoria">' + formatearPrecio(p.precio) + " c/u</p>";
    html = html + '<button class="boton-eliminar" onclick="eliminarDelCarrito(\'' + p.codigo + '\')">Eliminar</button>';
    html = html + "</div>";

    html = html + '<div class="col-4">';
    html = html + '<div class="control-cantidad">';
    html = html + '<button onclick="cambiarCantidad(\'' + p.codigo + '\', -1)">-</button>';
    html = html + "<span>" + linea.cantidad + "</span>";
    html = html + '<button onclick="cambiarCantidad(\'' + p.codigo + '\', 1)">+</button>';
    html = html + "</div>";
    html = html + '<p class="precio">' + formatearPrecio(totalLinea) + "</p>";
    html = html + "</div>";

    html = html + "</div>";
    html = html + "</div>";
  }

  html = html + '<button class="boton-eliminar" onclick="vaciarCarrito()">Vaciar el carrito</button>';

  caja.innerHTML = html;

  mostrarResumen(subtotal);
}

// Escribe la caja con los totales de la compra
function mostrarResumen(subtotal) {
  var caja = document.getElementById("resumen-carrito");

  if (caja == null) {
    return;
  }

  var descuento = calcularDescuento(subtotal);
  var envio = COSTO_ENVIO;

  if (subtotal >= MONTO_ENVIO_GRATIS) {
    envio = 0;
  }

  var total = subtotal - descuento + envio;

  var html = "";

  html = html + '<div id="resumen">';
  html = html + "<h3>Resumen</h3>";

  html = html + '<table class="tabla-resumen">';
  html = html + "<tr><td>Productos</td><td>" + formatearPrecio(subtotal) + "</td></tr>";

  if (descuento > 0) {
    html = html + '<tr class="fila-descuento"><td>Descuento (' + obtenerCupon() + ")</td><td>-" + formatearPrecio(descuento) + "</td></tr>";
  }

  if (envio == 0) {
    html = html + "<tr><td>Envio</td><td>Gratis</td></tr>";
  } else {
    html = html + "<tr><td>Envio</td><td>" + formatearPrecio(envio) + "</td></tr>";
  }

  html = html + '<tr class="fila-total"><td>Total</td><td>' + formatearPrecio(total) + "</td></tr>";
  html = html + "</table>";

  // Aviso de cuanto falta para el envio gratis
  if (subtotal < MONTO_ENVIO_GRATIS) {
    var falta = MONTO_ENVIO_GRATIS - subtotal;
    html = html + '<p class="aviso-envio">Te faltan ' + formatearPrecio(falta) + " para el envio gratis.</p>";
  }

  // Cupon de descuento
  html = html + '<label for="cupon">Cupon de descuento:</label>';
  html = html + '<input type="text" id="cupon" value="' + obtenerCupon() + '" maxlength="20">';
  html = html + '<button class="boton boton-bloque" onclick="aplicarCupon()">Aplicar cupon</button>';

  html = html + '<button class="boton boton-pagar" onclick="pagar()">Pagar</button>';
  html = html + "</div>";

  caja.innerHTML = html;
}

// Suma o resta una unidad. Si llega a cero, se elimina la linea.
function cambiarCantidad(codigo, cambio) {
  var carrito = obtenerCarrito();
  var producto = buscarProducto(codigo);

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo == codigo) {
      var nueva = carrito[i].cantidad + cambio;

      if (nueva < 1) {
        eliminarDelCarrito(codigo);
        return;
      }

      if (nueva > producto.stock) {
        alert("Solo quedan " + producto.stock + " unidades de este producto.");
        return;
      }

      carrito[i].cantidad = nueva;
    }
  }

  guardarCarrito(carrito);
  mostrarCarrito();
}

function eliminarDelCarrito(codigo) {
  var carrito = obtenerCarrito();
  var nuevoCarrito = [];

  // Se copian todas las lineas menos la que se quiere eliminar
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo != codigo) {
      nuevoCarrito.push(carrito[i]);
    }
  }

  guardarCarrito(nuevoCarrito);
  mostrarCarrito();
}

function vaciarCarrito() {
  if (confirm("Seguro que quieres vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    localStorage.removeItem("cupon");
    mostrarContador();
    mostrarCarrito();
  }
}

function aplicarCupon() {
  var campo = document.getElementById("cupon");
  var codigo = campo.value.toUpperCase();

  if (codigo == "") {
    localStorage.removeItem("cupon");
    mostrarCarrito();
    return;
  }

  if (codigo != "BOL10" && codigo != "BOL5000") {
    alert("El cupon ingresado no es valido.");
    return;
  }

  localStorage.setItem("cupon", codigo);
  alert("Cupon aplicado.");
  mostrarCarrito();
}

function pagar() {
  alert("La compra se procesara en la siguiente entrega del proyecto.");
}

/* ----- Se ejecuta cuando la pagina termina de cargar ----- */

window.onload = function () {
  mostrarDestacados();
  mostrarTodosLosProductos();
  mostrarDetalle();
  mostrarCarrito();
  mostrarContador();
};
