import express from 'express';

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {({}|[])|""} data
 * @param {Number} status
 */
function successResponse(req, res, data, status = 200) {

  let body, message, error

  if (data?.body) body = data.body
  //por si solo se envía un mensaje
  else body = data
  if (data?.message?.length > 0) message = data.message
  if (data?.error?.length > 0) error = data.error

  const obj = {
    body,
    message,
    error,
    status,
  }

  res.status(status).json(obj)
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {String} errorMessage
 * @param {Number} status
 * @param {({})} details
 */
function errorResponse(req, res, errorMessage, status = 500, details) {
  res.status(status).json({
    error: errorMessage,//el mensaje de error proporcionado.
    details: details,//los detalles del error.
    status: status,//el código de estado del error.
  })
}

export {
  successResponse,
  errorResponse,
}
