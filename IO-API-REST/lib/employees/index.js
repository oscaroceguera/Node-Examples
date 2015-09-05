'use stric';

import jsonBody from 'body/json';
import { fail, jsonfy } from '../utils/helpers';
import Employee from './model';

class EmployeeController{

  /**
   * [ GET /employees ]
   * - Buscar todos los documentos que existan.
   * - Devolver únicamente los campos fullName y picture.
   * - Cuando se resuelva la promesa, devolver una respuesta a la petición con el código 200
   *   de que todo fue bien reutilizando la respuesta de crecion de un
   *   objeto json con el mensaje "OK".
   * - El array de objetos buscados.
   * - Reutilizaremos la respuesta al "error" creando una función fail.
   *   Por tanto creamos el archivo "utils/helpers.js".
   */
  getAll(req, res){
    Employee
      .find({}, 'fullName picture')
      .then((employees) => {
        res.statusCode = 200;
        res.end(jsonfy('OK', employees))
      })
      .catch((err) => fail(err,res))
  }

  /**
   * [ POST /employees ]
   * - Crear un nuevo empleado en la base de datos
   * - Uso del modelo y funciones de mongoose
   * - Uso de "body/json" para parsear el contenido de la petición.
   * - Función create
   */
  save(req, res){
    jsonBody(req, res, (err, body) => {
      if(err) return fail(err, res)

      Employee
        .create(body)
        .then((employee) => {
          res.statusCode = 201;
          res.end(jsonfy('GUARDADO', employee))
        })
        //.catch((err) => fail(err, res))
    })
  }

  /**
   * [ GET /employees/:employeeID ]
   * - Consultar un solo empleado por ID
   * - EL endpoint será "":employeeId" que no es mas que el _id con el
   *   que mongoDB almacena los documentos.
   * - Para poder acceder a este valor lo recogemos en "this.employeedId"
   *   y para poder buscar uno correcto lo hacemos con el metodo "findById"
   */
  get(req, res) {
    let employeeId = this.employeeId;

    Employee
      .findById(employeeId)
      .then((employee)=>{
        if(employee){
          res.statusCode = 200;
          res.end(jsonfy('OK', employee));
        }else{
            res.statusCode = 404;
            res.end(jsonfy(`Employee ${employeeId} does no exists`));
        }
      })
      .catch((err) => fail(err, res))
  }

/**
 * [ PUT /employee/:employeeID ]
 * - Actualizar registro
 * - Este controlador es una mezcla entre un "GET id" y un "POST", ya
 *   ya que debemos hacer uso de "body/json" para parsear el contenido
 *   de la petición y una búsqueda por id.
 * - Mongoose nos da la función "findOneAndUpdate" para ello.
 */
  update(req, res) {
    let employeeId = this.employeeId;

    if(!employeeId) {
      res.statusCode = 404;
      return next();
    }

    jsonBody(req, res, (err, body) => {
      if(err) return fail(err, res)
      let updateEmployee = body;

      Employee
        .findOneAndUpdate({ _id: employeeId }, updateEmployee)
        .then((employee) => {
          res.statusCode = 200;
          res.end(jsonfy(`Employee ${employeeId} update succesfully`, employee))
        })
        //.catch((err) => fail(err, res))
    })
  }

  /**
   * [ DELETE /employee/:employeeId ]
   * - Borrado de registro de un registro
   * - Para eso método "findOneAndRemove" de mongoose que nos lo facilita
   */
  remove(req, res, next) {
    let employeeId = this.employeeId;

    if(!employeeId) {
      res.statusCode = 404;
      return next();
    }

    Employee
      .findOneAndRemove({_id : employeeId})
      .then(() => {
        res.statusCode = 204;
        res.end(jsonfy(`Employee ${employeId} deleted succesfully`))
      })
      //.catch((err) => fail(err, res))
  }

}

export default EmployeeController
