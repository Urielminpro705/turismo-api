const express = require("express");
const reviewsServices = require("../services/reviewsServices");

const router = express.Router();
const service = new reviewsServices();

/**
 * @swagger
 * /reviews:
 *  get:
 *      summary: Obtiene una lista de reseñas
 *      tags:
 *          -   Reviews
 *      responses:
 *          200:
 *              description: Lista de reseñas
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
 *                                          userId:
 *                                              type: string
 *                                          placeId:
 *                                              type: string
 *                                          comment:
 *                                              type: string
 *                                          rating:
 *                                              type: number
 *                                          date:
 *                                              type: string
 *                                              format: date-time
 */
router.get("/", async (req, res, next) => {
    try {
        const response = await service.getAllReviews();

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
 * /reviews/{id}:
 *  get:
 *      summary: Obtiene una reseña por id
 *      tags:
 *          -   Reviews
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID de la reseña
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Reseña por id
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
 *                                      userId:
 *                                          type: string
 *                                      placeId:
 *                                          type: string
 *                                      comment:
 *                                          type: string
 *                                      rating:
 *                                          type: number
 *                                      date:
 *                                          type: string
 *                                          format: date-time
 *          404:
 *              description: No se encontro una reseña con ese id
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
        const response = await service.getReviewById(id);

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
 * /reviews:
 *  post:
 *      summary: Crear una nueva reseña
 *      tags:
 *          -   Reviews
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                          placeId:
 *                              type: string
 *                          comment:
 *                              type: string
 *                          rating:
 *                              type: number
 *      responses:
 *          201:
 *              description: Se creo la reseña
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
 *                                      userId:
 *                                          type: string
 *                                      placeId:
 *                                          type: string
 *                                      comment:
 *                                          type: string
 *                                      rating:
 *                                          type: number
 *                                      date:
 *                                          type: string
 *                                          format: date-time
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
 *          404:
 *              description: El usuario y/o el lugar no existen
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
 *          409:
 *              description: El usuario ya dio una reseña a este lugar
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
        const response = await service.createReview(req.body);
    
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
 * /reviews/{id}:
 *  patch:
 *      summary: Actualizar valores de una reseña por ID
 *      tags:
 *          -   Reviews
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id de la reseña
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                          placeId:
 *                              type: string
 *                          comment:
 *                              type: string
 *                          rating:
 *                              type: number
 *      responses:
 *          200:
 *              description: Se actualizó la reseña
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
 *                                      userId:
 *                                          type: string
 *                                      placeId:
 *                                          type: string
 *                                      comment:
 *                                          type: string
 *                                      rating:
 *                                          type: number
 *                                      date:
 *                                          type: string
 *                                          format: date-time
 *          404:
 *              description: No se encontro la reseña, usuario o lugar
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
 *          409:
 *              description: El usuario ya dio una reseña a este lugar
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
        const response = await service.updateReview(id, req.body);
        
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
 * /reviews/{id}:
 *  delete:
 *      summary: Eliminar una reseña por ID
 *      tags:
 *          -   Reviews
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id de la reseña
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Se eliminó la reseña
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
 *              description: No se encontro la reseña
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
        const response = await service.deleteReview(id);
    
        res.status(response.statusCode).json({
            message: response.message,
            data: response.data
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;