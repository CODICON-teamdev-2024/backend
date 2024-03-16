import jwt from 'jsonwebtoken'
const secret = process.env.AUTH_JWT_SECRET || 'secret'

function createToken(user) {
  const { id, username } = user
  const payload = {
    sub: id,
    username,
  }
  const token = jwt.sign(payload, secret)
  return token
}

export { createToken }