import { ExtractJwt, Strategy } from "passport-jwt"

const secret = process.env.AUTH_JWT_SECRET || 'secret'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
}
const jwtStrategy = new Strategy(options, (payload, done) => {
  try {
    return done(null, payload)
  } catch (error) {
    done(error, false)
  }
})

export { jwtStrategy }