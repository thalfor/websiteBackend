//
require('express-async-errors');
const AppError = require('./utils/AppError');
//
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
//
const migrationsRun = require('./database/sqlite/migrations');
migrationsRun();
//
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
//
app.use((error, request, response, nexto) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  };
  console.error(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
//
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
//