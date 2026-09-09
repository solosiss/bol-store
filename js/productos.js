/* ==========================================================
   BOL Store - Arreglo de productos
   El proyecto pide listar los productos con JavaScript,
   por eso los datos estan en este arreglo y no en el HTML.
   ========================================================== */

var productos = [
  {
    codigo: "POL-001",
    nombre: "Polera chekeo postura",
    categoria: "Poleras",
    precio: 14990,
    stock: 32,
    stockCritico: 6,
    imagen: "img/productos/pol-001.jpg",
    destacado: true,
    descripcion: "Polera de algodon con estampado en el pecho. Corte erecto.",
    talla: "S / M / L / XL",
    material: "103% poliester con 3% de error",
    detalle: "Estampado en serigrafia"
  },
  {
    codigo: "POL-002",
    nombre: "Polera raging",
    categoria: "Poleras",
    precio: 17990,
    stock: 4,
    stockCritico: 6,
    imagen: "img/productos/pol-002.jpg",
    destacado: true,
    descripcion: "Polera de corte ancho, hombro caido y largo extendido. Llevala al gym aloserio.",
    talla: "M / L / XL / XXL",
    material: "Algodon organico",
    detalle: "Hombro caido, largo extendido"
  },
  {
    codigo: "PLR-001",
    nombre: "Poleron tech kl certero",
    categoria: "Polerones",
    precio: 34990,
    stock: 18,
    stockCritico: 4,
    imagen: "img/productos/plr-001.jpg",
    destacado: true,
    descripcion: "Un tech xxxxs pal corte. Capucha forrada y bolsillo canguro.",
    talla: "S / M / L / XL",
    material: "80% poliester 20% algodon",
    detalle: "Sin cierre, calce por la cabeza"
  },
  {
    codigo: "PLR-002",
    nombre: "La wea mas fea que me encontre",
    categoria: "Polerones",
    precio: 39990,
    stock: 9,
    stockCritico: 4,
    imagen: "img/productos/plr-002.jpg",
    destacado: false,
    descripcion: "Feo pero abriga. Cierre completo y bolsillos laterales.",
    talla: "S / M / L / XL",
    material: "Algodon french terry",
    detalle: "Cierre completo, dos bolsillos"
  },
  {
    codigo: "JOC-001",
    nombre: "Jockey Cuchi",
    categoria: "Jockeys",
    precio: 12990,
    stock: 41,
    stockCritico: 8,
    imagen: "img/productos/joc-001.jpg",
    destacado: true,
    descripcion: "El diablo, que maldito gorro. Seis paneles con bordado frontal.",
    talla: "Unica ajustable",
    material: "Sarga de algodon",
    detalle: "Visera curva, correa metalica"
  },
  {
    codigo: "JOC-002",
    nombre: "Fedora XDDD",
    categoria: "Jockeys",
    precio: 9990,
    stock: 0,
    stockCritico: 8,
    imagen: "img/productos/joc-002.jpg",
    destacado: false,
    descripcion: "Una fedora de verdad. Nadie sabe por que la tenemos en el catalogo.",
    talla: "Unica",
    material: "Fieltro acrilico reciclado",
    detalle: "Ala corta, cinta al tono"
  },
  {
    codigo: "ZAP-001",
    nombre: "Zapatilla Ricky Owings",
    categoria: "Zapatillas",
    precio: 54990,
    stock: 12,
    stockCritico: 3,
    imagen: "img/productos/zap-001.jpg",
    destacado: true,
    descripcion: "Con estas te elevai el ki. Cana alta y suela gruesa.",
    talla: "38 / 39 / 40 / 41 / 42 / 43",
    material: "Lona encerada",
    detalle: "Suela de goma vulcanizada"
  },
  {
    codigo: "CAR-001",
    nombre: "Cargo aura certero",
    categoria: "Cargos",
    precio: 44990,
    stock: 15,
    stockCritico: 4,
    imagen: "img/productos/car-001.jpg",
    destacado: false,
    descripcion: "Mas 100 de aura y tal. Seis bolsillos y ruedo ajustable.",
    talla: "38 / 40 / 42 / 44 / 46",
    material: "Gabardina de algodon",
    detalle: "Seis bolsillos, ruedo con cordon"
  }
];

/* Convierte 14990 en "$14.990" */
function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL");
}
