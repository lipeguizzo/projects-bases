import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = ['../routes/*.ts'];

swaggerAutogen(outputFile, endpointsFiles);
