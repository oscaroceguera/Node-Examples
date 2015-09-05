'use strict';

/**
 * Función de respuesta al error creando una función
 * fail.
 */
function fail (err, res) {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end(err.message);
}

/**
 * Devolver una respuesta a la petición con el código 200
 * de que todo fue bien y un objeto JSON (para ello usamos el método
 * JSON.stringify para codificar la respuesta) con el mensaje de OK.
 */
function jsonfy (message, data) {
  return JSON.stringify({
    message : message,
    data : data
  })
}

export { fail, jsonfy }
