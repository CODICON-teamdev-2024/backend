import LocalStrategy from "passport-local"
import Boom from "@hapi/boom"
import bcrypt from "bcrypt"
import { ControllerUser } from "./../../../components/users/controller.js"

const controller = new ControllerUser()

const localStrategy = new LocalStrategy({
  passReqToCallback: true,
},
  async (req, username, password, done) => {
    try {
      const user = await controller.findByUserName(username)
      if (!user) {
        return done(Boom.unauthorized("User not found"), false)
      }
      //compare password
      //desencriptamos la contraseña
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return done(Boom.unauthorized("Invalid password"), false)
      }
      const rta = { ...user }
      delete rta.password

      req.user = rta

      return done(null, rta);
    } catch (error) {
      done(error, false)
    }
  }
)

export { localStrategy }