# Autentificacion por token en Nodejs

La autenticación es una de las partes más importantes en las aplicaciones web. Es un punto de seguridad que algunas veces no es muy sencillo de crear.

El sistema de autenticación más usado actualmente es el basado en sesión o cookies, pero este tiene una gran desventaja, no es escalable y solo sirve en con para una plataforma especifica la web.

Esta API para autenticar usuarios puede ser consumida desde cualquier lenguaje que pueda manejar JSON ej. (Java, Python, Node.js, Objective-C, etc..) ademas la podemos usar en aplicaciones web con Angular, Backbone o también por Ajax.

**Siempre Usar SSL**

## Conceptos

**Stateless API:** API que no guarda el estado de la sesión en el servidor y se autentica el usuario por medio de un Token de seguridad.

## Lo que haremos

Construiremos una API para la autenticacion mediante tokens a los usuarios, usando Express, MongoDB, y jsonwebtoken.

## Lo que hara

Rutas no protegidas y protegidas.
Autenticación del usuario con **email** y **password**
El usuario guardara el token de manera local y se enviara en cada request
Validaremos el token, si es valido enviaremos respuesta en formato JSON

## Rutas necesarias

Utilizaremos rutas para autenticar al usuario y unas rutas protegidas para comprobar que nuestra api funciona correctamente.


| Ruta | Verbo | Descripción |
-------|-------|------------ |
/api/auth| POST | Autenticación de credenciales
/api/register| POST |  Registro de usuarios
/api/users | GET |Usuarios registrados (ruta protegida)
/api/noderos | GET | Mensaje random (ruta protegida)














