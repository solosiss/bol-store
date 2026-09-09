/* ==========================================================
   BOL Store - Arreglo de usuarios
   Los usuarios se listan en el mantenedor del administrador.
   Todos los RUN de este arreglo estan validados con el
   digito verificador, para poder probar el mantenedor.
   ========================================================== */

var tiposUsuario = ["Administrador", "Vendedor", "Cliente"];

var usuarios = [
  {
    run: "190110222",
    nombre: "Tomas",
    apellidos: "Salas Munoz",
    correo: "to.salasm@duocuc.cl",
    tipo: "Administrador",
    region: "Region Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: "Avenida Libertador 1234",
    fechaNacimiento: "2003-05-14"
  },
  {
    run: "203456786",
    nombre: "Camila",
    apellidos: "Reyes Fuentes",
    correo: "camila.reyes@gmail.com",
    tipo: "Vendedor",
    region: "Region Metropolitana de Santiago",
    comuna: "Providencia",
    direccion: "Calle Los Leones 456",
    fechaNacimiento: "2001-11-02"
  },
  {
    run: "176543213",
    nombre: "Ignacio",
    apellidos: "Vera Contreras",
    correo: "ignacio.vera@duoc.cl",
    tipo: "Vendedor",
    region: "Region de Valparaiso",
    comuna: "Vina del Mar",
    direccion: "Pasaje Las Rocas 78",
    fechaNacimiento: "1999-03-21"
  },
  {
    run: "13111222K",
    nombre: "Paula",
    apellidos: "Aguirre Soto",
    correo: "paula.aguirre@profesor.duoc.cl",
    tipo: "Administrador",
    region: "Region del Biobio",
    comuna: "Concepcion",
    direccion: "Avenida Colon 900",
    fechaNacimiento: "1988-07-09"
  },
  {
    run: "219876548",
    nombre: "Matias",
    apellidos: "Poblete Rojas",
    correo: "matias.poblete@gmail.com",
    tipo: "Cliente",
    region: "Region de La Araucania",
    comuna: "Temuco",
    direccion: "Calle Prat 210",
    fechaNacimiento: "2004-01-30"
  },
  {
    run: "16543210K",
    nombre: "Fernanda",
    apellidos: "Lagos Diaz",
    correo: "fernanda.lagos@gmail.com",
    tipo: "Cliente",
    region: "Region de Los Lagos",
    comuna: "Puerto Montt",
    direccion: "Camino Chinquihue 55",
    fechaNacimiento: "1996-09-17"
  },
  {
    run: "198754323",
    nombre: "Diego",
    apellidos: "Nunez Herrera",
    correo: "diego.nunez@duoc.cl",
    tipo: "Cliente",
    region: "Region de Coquimbo",
    comuna: "La Serena",
    direccion: "Avenida del Mar 3300",
    fechaNacimiento: "2002-06-25"
  }
];

/* Busca un usuario por su RUN. Devuelve null si no existe. */
function buscarUsuario(run) {
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].run == run) {
      return usuarios[i];
    }
  }
  return null;
}
