# BOL Store

Tienda online de ropa urbana desarrollada con HTML, CSS y JavaScript.

---

## Descripcion

BOL Store es una tienda de ropa urbana con productos de cinco categorias:
poleras, polerones, jockeys, zapatillas y pantalones cargo. Cada categoria tiene
caracteristicas distintas (talla, material, gramaje, numero, tipo de visera),
para que el catalogo no sea generico.

El sistema tiene dos partes:

- **Tienda**: la parte publica, que ve cualquier visitante.
- **Administrador**: la parte privada, para mantener productos y usuarios.

En esta primera entrega el sitio funciona solo en el navegador. No hay base de
datos ni servidor: los productos estan en un arreglo de JavaScript y el carrito
se guarda con `localStorage`.

---

## Tecnologias usadas

| Tecnologia | Para que se usa |
| --- | --- |
| HTML5 | Estructura y etiquetado semantico de las paginas |
| CSS3 | Hoja de estilos propia y externa (`css/styles.css`) |
| Bootstrap 5.3 | Solo el sistema de grilla (`row` y `col`), enlazado por CDN |
| JavaScript | Listado de productos, carrito y validacion de formularios |
| localStorage | Guardar el carrito de compras en el navegador |
| Git y GitHub | Control de versiones y trabajo en equipo |
| GitHub Pages | Publicacion del sitio |

Bootstrap se carga **antes** que `styles.css` para que la hoja propia pueda
modificar sus estilos por defecto.

---

## Estructura del proyecto

```
bol-store/
├── index.html            Pagina principal
├── css/
│   └── styles.css        Hoja de estilos propia (externa)
├── js/
│   ├── productos.js      Arreglo con los datos de los productos
│   └── main.js           Carrito de compras y listado de productos
├── img/
│   ├── productos/        Fotos de los productos
│   ├── blog/             Imagenes de las noticias
│   ├── hero.jpg          Imagen del banner
│   └── nosotros.jpg      Imagen del taller
├── docs/                 Documento ERS y planilla de requerimientos
├── .gitignore
└── README.md
```

---


## Paginas del sitio

### Tienda

| Pagina | Archivo | Estado |
| --- | --- | --- |
| Home | `index.html` | Listo |
| Productos | `productos.html` | Listo |
| Detalle de producto | `detalle-producto.html` | Listo |
| Carrito de compras | `carrito.html` | Listo |
| Compra exitosa | `compra-exitosa.html` | Listo |
| Registro de usuario | `registro.html` | Listo |
| Inicio de sesion | `login.html` | Listo |
| Nosotros | `nosotros.html` | Listo |
| Blogs | `blogs.html` | Listo |
| Detalle blog 1 | `blog-01.html` | Listo |
| Detalle blog 2 | `blog-02.html` | Listo |
| Contacto | `contacto.html` | Listo |

### Administrador

| Pagina | Archivo | Estado |
| --- | --- | --- |
| Home administrador | `admin/index.html` | Listo |
| Listado de productos | `admin/productos.html` | Listo |
| Nuevo producto | `admin/nuevo-producto.html` | Listo |
| Editar producto | `admin/editar-producto.html` | Listo |
| Listado de usuarios | `admin/usuarios.html` | Listo |
| Nuevo usuario | `admin/nuevo-usuario.html` | Listo |
| Editar usuario | `admin/editar-usuario.html` | Listo |

---

## Roles del sistema

| Rol | Permisos |
| --- | --- |
| Administrador | Acceso total al sistema |
| Vendedor | Ve la lista y el detalle de productos y de ordenes. Nada mas |
| Cliente | Solo puede acceder a la tienda |

---

## Validaciones con JavaScript

Resumen de las reglas de negocio que deben cumplir los formularios.

**Inicio de sesion**

- Correo: requerido, maximo 100 caracteres, formato de correo valido
- Contrasena: requerida, entre 4 y 10 caracteres, alfanumerica con caracteres especiales

**Registro de usuario**

- RUN: requerido, sin puntos ni guion, entre 7 y 9 caracteres, validado con digito verificador
- Nombre: requerido, maximo 50 caracteres
- Apellidos: requerido, maximo 100 caracteres
- Correo: requerido, maximo 100 caracteres, solo `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`
- Fecha de nacimiento: opcional
- Region y comuna: listas desplegables. Al cambiar la region cambian las comunas
- Direccion: requerida, maximo 300 caracteres

**Contacto**

- Nombre: requerido, maximo 100 caracteres
- Correo: maximo 100 caracteres, formato valido
- Comentario: requerido, maximo 500 caracteres

**Producto (administrador)**

- Codigo: requerido, texto, minimo 3 caracteres
- Nombre: requerido, maximo 100 caracteres
- Descripcion: opcional, maximo 500 caracteres
- Precio: requerido, minimo 0, acepta decimales
- Stock: requerido, minimo 0, solo numeros enteros
- Stock critico: opcional, minimo 0, solo numeros enteros
- Categoria: requerida, lista desplegable
- Imagen: opcional

---

## Reglas del carrito de compras

- El carrito se guarda en `localStorage` con la llave `carrito`
- No se pueden agregar mas unidades que el stock disponible del producto
- Si la cantidad de una linea baja a cero, la linea se elimina
- Envio: $3.990. Es gratis en compras sobre $50.000
- Cupon `BOL10`: descuenta un 10% del total de los productos
- Cupon `BOL5000`: descuenta $5.000 en compras sobre $50.000
- El cupon aplicado tambien se guarda en `localStorage`
- Al pagar se guarda el pedido en `localStorage` y se vacia el carrito
- Todos los avisos se escriben en la pagina, no con ventanas emergentes

---
