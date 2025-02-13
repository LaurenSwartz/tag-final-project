const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "T.A.G API",
    description: "Technology Assets Gateway - An Asset Management System",
  },
  host: "tag-final-project.onrender.com",
  // host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
