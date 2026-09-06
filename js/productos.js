/* ==========================================================
   BOL Store - Arreglo de productos
   El proyecto pide listar los productos con JavaScript,
   por eso los datos estan en este arreglo y no en el HTML.
   ========================================================== */

var productos = [
  {
    codigo: "POL-001",
    nombre: "Polera Cerro Blanco",
    categoria: "Poleras",
    precio: 14990,
    stock: 32,
    stockCritico: 6,
    imagen: "img/productos/pol-001.jpg",
    destacado: true,
    descripcion: "Polera de algodon con estampado en el pecho. Corte recto.",
    talla: "S / M / L / XL",
    material: "100% algodon peinado",
    detalle: "Gramaje 180 g/m2"
  },
  {
    codigo: "POL-002",
    nombre: "Polera Oversize",
    categoria: "Poleras",
    precio: 17990,
    stock: 4,
    stockCritico: 6,
    imagen: "img/productos/pol-002.jpg",
    destacado: true,
    descripcion: "Polera de corte ancho, hombro caido y largo extendido.",
    talla: "M / L / XL / XXL",
    material: "Algodon organico",
    detalle: "Gramaje 220 g/m2"
  },
  {
    codigo: "PLR-001",
    nombre: "Poleron Micro Norte",
    categoria: "Polerones",
    precio: 34990,
    stock: 18,
    stockCritico: 4,
    imagen: "img/productos/plr-001.jpg",
    destacado: true,
    descripcion: "Poleron con capucha y bolsillo canguro. Sin cierre.",
    talla: "S / M / L / XL",
    material: "80% algodon 20% poliester",
    detalle: "Interior perchado"
  },
  {
    codigo: "PLR-002",
    nombre: "Poleron Estacion",
    categoria: "Polerones",
    precio: 39990,
    stock: 9,
    stockCritico: 4,
    imagen: "img/productos/plr-002.jpg",
    destacado: false,
    descripcion: "Poleron con cierre completo y bolsillos laterales.",
    talla: "S / M / L / XL",
    material: "Algodon french terry",
    detalle: "Cierre completo"
  },
  {
    codigo: "JOC-001",
    nombre: "Jockey Seis Paneles",
    categoria: "Jockeys",
    precio: 12990,
    stock: 41,
    stockCritico: 8,
    imagen: "img/productos/joc-001.jpg",
    destacado: true,
    descripcion: "Jockey clasico de seis paneles con bordado frontal.",
    talla: "Unica ajustable",
    material: "Sarga de algodon",
    detalle: "Visera curva"
  },
  {
    codigo: "JOC-002",
    nombre: "Gorro Beanie",
    categoria: "Jockeys",
    precio: 9990,
    stock: 0,
    stockCritico: 8,
    imagen: "img/productos/joc-002.jpg",
    destacado: false,
    descripcion: "Gorro de punto con doblez, tejido cerrado para invierno.",
    talla: "Unica",
    material: "Acrilico reciclado",
    detalle: "Sin visera"
  },
  {
    codigo: "ZAP-001",
    nombre: "Zapatilla Vega",
    categoria: "Zapatillas",
    precio: 54990,
    stock: 12,
    stockCritico: 3,
    imagen: "img/productos/zap-001.jpg",
    destacado: true,
    descripcion: "Zapatilla baja de lona con suela de goma vulcanizada.",
    talla: "38 / 39 / 40 / 41 / 42 / 43",
    material: "Lona encerada",
    detalle: "Plantilla extraible"
  },
  {
    codigo: "CAR-001",
    nombre: "Cargo Ruta 5",
    categoria: "Cargos",
    precio: 44990,
    stock: 15,
    stockCritico: 4,
    imagen: "img/productos/car-001.jpg",
    destacado: false,
    descripcion: "Pantalon cargo de gabardina con seis bolsillos.",
    talla: "38 / 40 / 42 / 44 / 46",
    material: "Gabardina de algodon",
    detalle: "Ruedo ajustable"
  }
];

/* Convierte 14990 en "$14.990" */
function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL");
}
