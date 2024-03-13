import { errorResponse } from "./response.js"

function errorLogs(err, req, res, next) {
  // mostrar todos los detalles de un error, y el stack de errores
  console.error(err)
  next(err)
}

function errorBoomHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    // res.status(output.statusCode).json(output.payload)
    errorResponse(req, res, output.payload.error, output.statusCode, err)
  }
  next(err)
}

function errorHandler(err, req, res, next) {
  errorResponse(req, res, err.message, 500, err)
}

export {
  errorLogs,
  errorHandler,
  errorBoomHandler,
}
