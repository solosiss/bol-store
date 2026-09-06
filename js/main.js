/* ==========================================================
   BOL Store - Script principal
   Muestra los productos destacados en la pagina de inicio
   y controla el contador del carrito de compras.
   ========================================================== */

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

// Agrega un producto al carrito revisando que haya stock
function agregarAlCarrito(codigo) {
  // 1. Buscar el producto en el arreglo
  var producto = null;
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].codigo == codigo) {
      producto = productos[i];
    }
  }

  if (producto == null) {
    alert("El producto no existe.");
    return;
  }

  if (producto.stock == 0) {
    alert("Este producto esta sin stock.");
    return;
  }

  // 2. Revisar si ya estaba en el carrito
  var carrito = obtenerCarrito();
  var encontrado = false;

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo == codigo) {
      if (carrito[i].cantidad + 1 > producto.stock) {
        alert("Solo quedan " + producto.stock + " unidades.");
        return;
      }
      carrito[i].cantidad = carrito[i].cantidad + 1;
      encontrado = true;
    }
  }

  // 3. Si no estaba, se agrega como producto nuevo
  if (encontrado == false) {
    carrito.push({ codigo: codigo, cantidad: 1 });
  }

  guardarCarrito(carrito);
  alert(producto.nombre + " se agrego al carrito.");
}

/* ----- Mostrar los productos destacados en la home ----- */

function mostrarDestacados() {
  var caja = document.getElementById("lista-destacados");

  // Si no estamos en la pagina de inicio, esta caja no existe
  if (caja == null) {
    return;
  }

  var html = "";

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];

    // Solo mostramos los que estan marcados como destacados
    if (p.destacado == true) {
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
    }
  }

  caja.innerHTML = html;
}

/* ----- Menu para pantallas pequenas ----- */

function abrirMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display == "block") {
    menu.style.display = "";
  } else {
    menu.style.display = "block";
  }
}

/* ----- Se ejecuta cuando la pagina termina de cargar ----- */

window.onload = function () {
  mostrarDestacados();
  mostrarContador();
};
