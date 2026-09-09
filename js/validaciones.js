/* ==========================================================
   BOL Store - Validaciones de formularios
   Todas las reglas salen de los requerimientos del cliente.
   Los mensajes de error se escriben dentro de la pagina,
   debajo de cada campo, y no con ventanas emergentes.
   ========================================================== */

/* ----- Funciones de ayuda ----- */

// Pinta el mensaje de error debajo del campo y marca el borde en rojo.
// Cada campo tiene un <span> con id "error-" + el id del campo.
function mostrarError(idCampo, mensaje) {
  var campo = document.getElementById(idCampo);
  var caja = document.getElementById("error-" + idCampo);

  if (campo != null) {
    campo.className = "campo-malo";
  }
  if (caja != null) {
    caja.innerHTML = mensaje;
    caja.className = "mensaje-error";
  }
  return false;
}

// Deja el campo como valido y borra el mensaje
function marcarBueno(idCampo) {
  var campo = document.getElementById(idCampo);
  var caja = document.getElementById("error-" + idCampo);

  if (campo != null) {
    campo.className = "campo-bueno";
  }
  if (caja != null) {
    caja.innerHTML = "";
    caja.className = "";
  }
  return true;
}

// Devuelve el texto de un campo sin espacios al principio ni al final
function valorDe(idCampo) {
  var campo = document.getElementById(idCampo);
  if (campo == null) {
    return "";
  }
  return campo.value.trim();
}

/* ----- Validaciones basicas reutilizables ----- */

// Formato de correo segun RFC2822 (version simplificada y legible)
function esCorreoValido(correo) {
  var patron = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return patron.test(correo);
}

// Revisa que el correo termine en alguno de los dominios permitidos
function esCorreoPermitido(correo) {
  var permitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  for (var i = 0; i < permitidos.length; i++) {
    // Se compara el final del correo con cada dominio de la lista
    if (correo.toLowerCase().endsWith(permitidos[i])) {
      return true;
    }
  }
  return false;
}

/*
  Valida un RUN chileno calculando su digito verificador.
  Se usa el metodo del modulo 11: se multiplica cada numero del RUN,
  de derecha a izquierda, por la serie 2,3,4,5,6,7 y se vuelve a empezar.
  Ejemplo de RUN valido sin puntos ni guion: 19011022K
*/
function esRunValido(run) {
  // El ultimo caracter es el digito verificador
  var cuerpo = run.substring(0, run.length - 1);
  var digito = run.charAt(run.length - 1).toUpperCase();

  // El cuerpo tiene que ser solo numeros
  if (/^[0-9]+$/.test(cuerpo) == false) {
    return false;
  }

  var suma = 0;
  var multiplicador = 2;

  // Se recorre el cuerpo desde el ultimo numero hacia el primero
  for (var i = cuerpo.length - 1; i >= 0; i--) {
    suma = suma + parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador + 1;

    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  var resto = 11 - (suma % 11);
  var esperado = "";

  if (resto == 11) {
    esperado = "0";
  } else if (resto == 10) {
    esperado = "K";
  } else {
    esperado = String(resto);
  }

  return digito == esperado;
}

/* ==========================================================
   FORMULARIO DE INICIO DE SESION
   Correo: requerido, max 100, formato valido
   Contrasena: requerida, entre 4 y 10, alfanumerica con
   caracteres especiales
   ========================================================== */

function validarCorreoLogin() {
  var correo = valorDe("correo");

  if (correo == "") {
    return mostrarError("correo", "Escribe tu correo electronico.");
  }
  if (correo.length > 100) {
    return mostrarError("correo", "El correo no puede tener mas de 100 caracteres.");
  }
  if (esCorreoValido(correo) == false) {
    return mostrarError("correo", "El correo no tiene un formato valido. Ejemplo: nombre@gmail.com");
  }

  return marcarBueno("correo");
}

function validarPasswordLogin() {
  var clave = valorDe("password");

  if (clave == "") {
    return mostrarError("password", "Escribe tu contrasena.");
  }
  if (clave.length < 4 || clave.length > 10) {
    return mostrarError("password", "La contrasena debe tener entre 4 y 10 caracteres. Escribiste " + clave.length + ".");
  }

  // Tiene que traer al menos una letra, un numero y un caracter especial
  var tieneLetra = /[A-Za-z]/.test(clave);
  var tieneNumero = /[0-9]/.test(clave);
  var tieneEspecial = /[^A-Za-z0-9]/.test(clave);

  if (tieneLetra == false || tieneNumero == false || tieneEspecial == false) {
    return mostrarError("password", "La contrasena debe combinar letras, numeros y al menos un caracter especial como * o #.");
  }

  return marcarBueno("password");
}

function validarLogin() {
  // Se guardan los resultados en variables para que se revisen
  // todos los campos y no solo hasta el primer error
  var ok1 = validarCorreoLogin();
  var ok2 = validarPasswordLogin();

  if (ok1 && ok2) {
    document.getElementById("aviso-formulario").innerHTML =
      "Datos correctos. La sesion se iniciara cuando el sitio tenga base de datos.";
    document.getElementById("aviso-formulario").className = "mensaje-exito";
  } else {
    document.getElementById("aviso-formulario").innerHTML =
      "Revisa los campos marcados en rojo.";
    document.getElementById("aviso-formulario").className = "mensaje-error";
  }

  // Se devuelve false para que la pagina no se recargue
  return false;
}

/* ==========================================================
   FORMULARIO DE REGISTRO DE USUARIO
   ========================================================== */

function validarRun() {
  var run = valorDe("run").toUpperCase();

  if (run == "") {
    return mostrarError("run", "Escribe tu RUN sin puntos ni guion. Ejemplo: 190110222");
  }
  if (run.indexOf(".") != -1 || run.indexOf("-") != -1) {
    return mostrarError("run", "Escribe el RUN sin puntos ni guion.");
  }
  if (run.length < 7 || run.length > 9) {
    return mostrarError("run", "El RUN debe tener entre 7 y 9 caracteres. Escribiste " + run.length + ".");
  }
  if (esRunValido(run) == false) {
    return mostrarError("run", "El RUN no es valido. Revisa el digito verificador.");
  }

  return marcarBueno("run");
}

function validarNombre() {
  var nombre = valorDe("nombre");

  if (nombre == "") {
    return mostrarError("nombre", "Escribe tu nombre.");
  }
  if (nombre.length > 50) {
    return mostrarError("nombre", "El nombre no puede tener mas de 50 caracteres.");
  }

  return marcarBueno("nombre");
}

function validarApellidos() {
  var apellidos = valorDe("apellidos");

  if (apellidos == "") {
    return mostrarError("apellidos", "Escribe tus apellidos.");
  }
  if (apellidos.length > 100) {
    return mostrarError("apellidos", "Los apellidos no pueden tener mas de 100 caracteres.");
  }

  return marcarBueno("apellidos");
}

function validarCorreoRegistro() {
  var correo = valorDe("correo");

  if (correo == "") {
    return mostrarError("correo", "Escribe tu correo electronico.");
  }
  if (correo.length > 100) {
    return mostrarError("correo", "El correo no puede tener mas de 100 caracteres.");
  }
  if (esCorreoValido(correo) == false) {
    return mostrarError("correo", "El correo no tiene un formato valido.");
  }
  if (esCorreoPermitido(correo) == false) {
    return mostrarError("correo", "Solo aceptamos correos @duoc.cl, @profesor.duoc.cl y @gmail.com");
  }

  return marcarBueno("correo");
}

function validarRegion() {
  var region = valorDe("region");

  if (region == "") {
    return mostrarError("region", "Selecciona tu region.");
  }

  return marcarBueno("region");
}

function validarComuna() {
  var comuna = valorDe("comuna");

  if (comuna == "") {
    return mostrarError("comuna", "Selecciona tu comuna.");
  }

  return marcarBueno("comuna");
}

function validarDireccion() {
  var direccion = valorDe("direccion");

  if (direccion == "") {
    return mostrarError("direccion", "Escribe tu direccion.");
  }
  if (direccion.length > 300) {
    return mostrarError("direccion", "La direccion no puede tener mas de 300 caracteres.");
  }

  return marcarBueno("direccion");
}

function validarRegistro() {
  var ok1 = validarRun();
  var ok2 = validarNombre();
  var ok3 = validarApellidos();
  var ok4 = validarCorreoRegistro();
  var ok5 = validarRegion();
  var ok6 = validarComuna();
  var ok7 = validarDireccion();

  var aviso = document.getElementById("aviso-formulario");

  if (ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7) {
    aviso.innerHTML = "Registro correcto. Los datos se guardaran cuando el sitio tenga base de datos.";
    aviso.className = "mensaje-exito";
  } else {
    aviso.innerHTML = "Hay campos con errores. Revisa los que estan marcados en rojo.";
    aviso.className = "mensaje-error";
  }

  return false;
}

/* ----- Regiones y comunas ----- */

// Llena la lista de regiones al cargar la pagina
function cargarRegiones() {
  var lista = document.getElementById("region");

  if (lista == null) {
    return;
  }

  var html = '<option value="">-- Seleccione la region --</option>';

  for (var i = 0; i < regiones.length; i++) {
    html = html + '<option value="' + regiones[i].nombre + '">' + regiones[i].nombre + "</option>";
  }

  lista.innerHTML = html;
}

// Cuando el usuario elige una region, se cargan solo sus comunas
function cambiarComunas() {
  var region = valorDe("region");
  var lista = document.getElementById("comuna");

  if (lista == null) {
    return;
  }

  var html = '<option value="">-- Seleccione la comuna --</option>';

  for (var i = 0; i < regiones.length; i++) {
    if (regiones[i].nombre == region) {
      var comunas = regiones[i].comunas;

      for (var j = 0; j < comunas.length; j++) {
        html = html + '<option value="' + comunas[j] + '">' + comunas[j] + "</option>";
      }
    }
  }

  lista.innerHTML = html;
}

/* ==========================================================
   FORMULARIO DE CONTACTO
   Nombre: requerido, max 100
   Correo: max 100, formato valido
   Comentario: requerido, max 500
   ========================================================== */

function validarNombreContacto() {
  var nombre = valorDe("nombre");

  if (nombre == "") {
    return mostrarError("nombre", "Escribe tu nombre.");
  }
  if (nombre.length > 100) {
    return mostrarError("nombre", "El nombre no puede tener mas de 100 caracteres.");
  }

  return marcarBueno("nombre");
}

function validarCorreoContacto() {
  var correo = valorDe("correo");

  // En contacto el correo no es obligatorio, pero si se escribe
  // tiene que tener un formato valido
  if (correo == "") {
    return marcarBueno("correo");
  }
  if (correo.length > 100) {
    return mostrarError("correo", "El correo no puede tener mas de 100 caracteres.");
  }
  if (esCorreoValido(correo) == false) {
    return mostrarError("correo", "El correo no tiene un formato valido.");
  }

  return marcarBueno("correo");
}

function validarComentario() {
  var comentario = valorDe("comentario");

  if (comentario == "") {
    return mostrarError("comentario", "Escribe tu mensaje.");
  }
  if (comentario.length > 500) {
    return mostrarError("comentario", "El mensaje no puede tener mas de 500 caracteres.");
  }

  return marcarBueno("comentario");
}

// Muestra cuantos caracteres quedan disponibles mientras se escribe
function contarCaracteres() {
  var comentario = valorDe("comentario");
  var contador = document.getElementById("contador-comentario");

  if (contador == null) {
    return;
  }

  var quedan = 500 - comentario.length;
  contador.innerHTML = "Quedan " + quedan + " caracteres.";

  if (quedan < 50) {
    contador.className = "mensaje-error";
  } else {
    contador.className = "ayuda";
  }
}

function validarContacto() {
  var ok1 = validarNombreContacto();
  var ok2 = validarCorreoContacto();
  var ok3 = validarComentario();

  var aviso = document.getElementById("aviso-formulario");

  if (ok1 && ok2 && ok3) {
    aviso.innerHTML = "Mensaje enviado. Te responderemos a la brevedad.";
    aviso.className = "mensaje-exito";
  } else {
    aviso.innerHTML = "Revisa los campos marcados en rojo.";
    aviso.className = "mensaje-error";
  }

  return false;
}
