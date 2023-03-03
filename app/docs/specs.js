const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boarding Pass Sorter API with Swagger",
      version: "0.1.0",
      description: "Boarding Pass Sorter API"
    },
    servers: [
      {
        url: "http://localhost:8081",
      },
    ],
  },
  apis: ["./app/docs/*.js"],
};

module.exports = options;
