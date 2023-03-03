const dotenv = require("dotenv");
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const { errorHandler } = require("./handlers");
const { sortRouter } = require("./routers");
const { options } = require('./docs');

dotenv.config();
const app = express();
const { globalErrorHandler } = errorHandler;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "*/*" }));
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));

app.use("/sort", sortRouter);

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(globalErrorHandler);

module.exports = app;
