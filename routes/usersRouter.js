const express = require("express");
const usersServices = require("../services/usersServices");

const router = express.Router();
const service = new usersServices();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Obtiene una lista de usuarios
 *      tags:
 *          -   Users
 *      responses:
 *          200:
 *              description: Lista de usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: string
 *                                          name:
 *                                              type: string
 *                                          username:
 *                                              type: string
 *                                          password:
 *                                              type: string
 */
router.get("/", async (req, res) => {
    const response = await service.getAllUsers();

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Obtiene un usuario por id
 *      tags:
 *          -   Users
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID del usuario
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Usuario por id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      username:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *          404:
 *              description: No se encontro un usuario con ese id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}
 */
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await service.getUserById(id);
    
    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Crear un nuevo usuario
 *      tags:
 *          -   Users
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          201:
 *              description: Se creo el usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id: 
 *                                          type: string
 *                                      name:
 *                                          type: string   
 *                                      username:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *          400:
 *              description: Faltan atributos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}                            
 */
router.post("/", async (req, res) => {
    const response = await service.createUser(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *      summary: Actualizar valores de un usuario por ID
 *      tags:
 *          -   Users
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id del usuario
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Se actualizó el usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      username:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *          404:
 *              description: No se encontro el usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}
 */
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await service.updateUser(id, req.body);
    
    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: Eliminar un usuario por ID
 *      tags:
 *          -   Users
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id del usuario
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Se eliminó el usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string     
 *          404:
 *              description: No se encontro el usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}        
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await service.deleteUser(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

module.exports = router;