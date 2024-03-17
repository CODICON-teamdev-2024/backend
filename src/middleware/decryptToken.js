import jwt from 'jsonwebtoken';
const secret = process.env.AUTH_JWT_SECRET || 'secret'

//desencriptar token si lo tiene y guardarlo en req.user , si no tra el token no hace
function decryptToken(req, res, next) {
  // Obtener el token del encabezado de la solicitud
  const bearer = req.headers.authorization;
  //le quitamos el bearer al token
  const tokenSplit = bearer?.split(" ")
  const token = tokenSplit?.[1]
  // Verificar si el token existe

  if (!token) {
    req.user = null;
    next();
  }

  try {
    // Verificar y desencriptar el token para obtener el payload
    const decodedToken = jwt.verify(token, secret, { ignoreExpiration: true });

    // Agregar el token desencriptado al objeto de solicitud
    req.user = decodedToken;

    // Pasar al siguiente middleware
    next();
  } catch (error) {
    req.user = null;
    next();
  }
}

export { decryptToken };