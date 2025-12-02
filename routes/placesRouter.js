const express = require("express");
const placeServices = require("../services/placesServices");

const router = express.Router();
const service = new placeServices();

/**
 * @swagger
 * /places:
 *  get:
 *      summary: Obtiene una lista de lugares
 *      tags:
 *          -   Places
 *      responses:
 *          200:
 *              description: Lista de lugares
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
 *                                          description:
 *                                              type: string
 *                                          image:
 *                                              type: string
 *                                          location:
 *                                              type: object
 *                                              properties:
 *                                                  type:
 *                                                      type: string
 *                                                      example: "Point"
 *                                                  coordinates:
 *                                                      type: array
 *                                                      items:
 *                                                          type: number
 */
router.get("/", async (req, res, next) => {
    try {
        const response = await service.getAllPlaces();

        res.status(response.statusCode).json({
            message: response.message,
            data: response.data
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /places/{id}:
 *  get:
 *      summary: Obtiene un lugar por id
 *      tags:
 *          -   Places
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID del lugar
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Lugar por id
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
 *                                          description:
 *                                              type: string
 *                                          image:
 *                                              type: string
 *                                          location:
 *                                              type: object
 *                                              properties:
 *                                                  type:
 *                                                      type: string
 *                                                      example: "Point"
 *                                                  coordinates:
 *                                                      type: array
 *                                                      items:
 *                                                          type: number
 *          404:
 *              description: No se encontro un lugar con ese id
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
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await service.getPlaceById(id);

        res.status(response.statusCode).json({
            message: response.message,
            data: response.data
        });
    } catch (err) {
        next(err);
    }    
});

/**
 * @swagger
 * /places:
 *  post:
 *      summary: Crear un nuevo lugar
 *      tags:
 *          -   Places
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          image:
 *                              type: string
 *                          latitude:
 *                              type: number
 *                          longitude:
 *                              type: number
 *      responses:
 *          201:
 *              description: Se creo el lugar
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
 *                                          description:
 *                                              type: string
 *                                          image:
 *                                              type: string
 *                                          location:
 *                                              type: object
 *                                              properties:
 *                                                  type:
 *                                                      type: string
 *                                                      example: "Point"
 *                                                  coordinates:
 *                                                      type: array
 *                                                      items:
 *                                                          type: number
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
router.post("/", async (req, res, next) => {
    try {
        const response = await service.createPlace(req.body);
    
        res.status(response.statusCode).json({
            message: response.message,
            data: response.data
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /places/{id}:
 *  patch:
 *      summary: Actualizar valores de un lugar por ID
 *      tags:
 *          -   Places
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id del lugar
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
 *                          description:
 *                              type: string
 *                          image:
 *                              type: string
 *                          latitude:
 *                              type: number
 *                          longitude:
 *                              type: number
 *      responses:
 *          200:
 *              description: Se actualizó el lugar
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
 *                                          description:
 *                                              type: string
 *                                          image:
 *                                              type: string
 *                                          location:
 *                                              type: object
 *                                              properties:
 *                                                  type:
 *                                                      type: string
 *                                                      example: "Point"
 *                                                  coordinates:
 *                                                      type: array
 *                                                      items:
 *                                                          type: number
 *          404:
 *              description: No se encontro el lugar
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
router.patch("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const response = await service.updatePlace(id, req.body);
        
        res.status(response.statusCode).json({
            message: response.message,
            data: response.data
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /places/{id}:
 *  delete:
 *      summary: Eliminar un lugar por ID
 *      tags:
 *          -   Places
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id del lugar
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Se eliminó el lugar
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
 *              description: No se encontro el lugar
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
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await service.deletePlace(id);
    
        res.status(response.statusCode).json({
            message: response.message,
            data: response.data
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;