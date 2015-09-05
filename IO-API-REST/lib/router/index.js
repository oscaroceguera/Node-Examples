'use stric'

//  Manejo de las rutas
import course from 'course';
import EmployeeController from '../employees';
//import logger from '../utils/logger';

const router       = course();
const employeeCtrl = new EmployeeController();

/**
 * Creamos un middleware para todas las rutas con la función
 * req.all donde especificamos el statusCode por defecto,
 * la cabecera de Content-Type y la versión del API con x-ver
 */
router.all((req, res, next) => {
  //logger.info(req.method, req.url);

  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('x-ver', '1.0');
  next();
});

/**
 * Rutas para GET, POST, PUT y DELETE con su respectivo controlador
 */
router.get('/', (req, res) => res.end('Welcome to Employee API REST'));
router.get('/employees', employeeCtrl.getAll);
router.get('/employees/:employeeId', employeeCtrl.get);
router.post('/employees', employeeCtrl.save);
router.delete('/employees/:employeeId', employeeCtrl.remove);
router.put('/employees/:employeeId', employeeCtrl.update);

/**
 * Para el resto de las rutas, se supone que no estan definidas, por
 * lo tanto debemos mostrar un codigo de error y un mensaje que no existe
 */
function onRequest(req, res){
  router(req, res, (err) => {
    if(err) return fail(err, res)

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/pain');
    res.end(`404 Not Fount: ${req.url}`);
  })
}

export default onRequest;
