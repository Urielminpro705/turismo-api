// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuracion de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API',
    version: '1.0.0',
    description: 'Documentacion de la API con Swagger',
  },
  servers: [
    {
      url: process.env.HOST,
      description: 'Servidor de desarrollo'
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files
  apis: ['./routes/*.js'], // Ajustamos esto en la ruta de los archivos
}

const swaggerSpect = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect));
}

module.exports = setupSwagger;