# Diseño del API

Vamos a implementar un API RESTful, lo que significa que haremos uso de todos los métodos de HTTTP, para poder leer, excribir, actualizar y eliminar (POST, GET, PUT y DELETE)

## Permitted HTTP methods

| METHOD |            Description          |
| ------ | ------------------------------- |
| GET    | GET resource or a resource list |
| POST   | Create a resource               |
| PUT    | Update a resource               |
| DELETE | Delete Resource                 |

## Response Codes

| CODE |            Description          |
| ---- | ------------------------------- |
| 200  | Success                         |
| 201  | Success - New resource created  |
| 204  | Succes - No new data response   |
| 301  | Moved permanently               |
| 304  | Not Modified                    |
| 307  | Temporary redirec               |
| 400  | Bad request - The request can not evaluated                   |
| 401  | Unauthorized - The user is no authenticated for this resource |
| 404  | Not Found - The resource has no exist  |
| 422  | Unprocessable Entity - validate exists |
| 429  | Limit exceed - Try again later         |
| 500  | Server error                           |
| 503  | Service not available                  |

---

Vamos a crear un API que nos permita crear empleados y acceder a ellos. Algo como lo que hemos utilizado en los tutoriales de React, pero esta vez visto desde el lado del backend. Estos serán los métodos que utilizaremos y la URL de cada uno:

* **POST /employees** - Crea un nuevo empleado :

  ```
  {
    "fullName":"Steve Jobs",
    "picture":"http://images.com/steve.jpg",
    "department":"Marketing",
    "title": "CEO",
    "phone":"667-667-667"
  }
  ```

* **GET /employees** - Devuelve una lista de todos los empleados :

  ```
  {
      "message": "OK",
      "data": [
          {
              "_id": "558bf7ba690df074fdc8ef0b",
              "fullName": "Bill Gates",
              "picture": "http://images.com/billgates.jpg"
          },
          {
              "_id": "558bf7c5690df074fdc8ef0c",
              "fullName": "Steve Jobs",
              "picture": "http://images.com/steve.jpg"
          },
          ...
      ]
  }
  ```

* **GET /employees/:id** - Devuelve la información de un determinado empleado :

  http://localhost:3000/employees/558bf7ba690df074fdc8ef0b

    ```
    {
    "message": "OK",
    "data": {
      "_id": "558bf7ba690df074fdc8ef0b",
      "fullName": "Bill Gates",
      "picture": "http://images.com/billgates.jpg",
      "department": "Business",
      "title": "CEO",
      "phone": "666-666-666",
      "__v": 0
    }
  }
  ```

* **PUT /employees/:id** - Actualiza la información de un determinado empleado :

  http://localhost:3000/employees/558bf7ba690df074fdc8ef0b

    ```
    {
    "message": "OK",
    "data": {
      "_id": "558bf7ba690df074fdc8ef0b",
      "fullName": "Bill Gates",
      "picture": "http://images.com/billgates.jpg",
      "department": "Business",
      "title": "CEO",
      "phone": "666-666-666",
      "__v": 0
    }
  }
  ```

* **DELETE /employees/:id** - Elimina el empleado :

  http://localhost:3000/employees/558bf7ba690df074fdc8ef0b

Los registros se **almacenarán en MONGODB**, una base de datos NoSQL.
