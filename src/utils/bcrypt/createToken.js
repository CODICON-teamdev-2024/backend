import jwt from 'jsonwebtoken'
const secret = process.env.AUTH_JWT_SECRET || 'secret'

function createToken(user) {
  const { id, username } = user
  const payload = {
    id,
    username,
  }
  //encodeamos el payload con el secret y le damos un tiempo de expiración
  const token = jwt.sign(payload, secret,)
  return token
}

export { createToken }