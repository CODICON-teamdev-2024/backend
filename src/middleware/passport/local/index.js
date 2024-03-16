import LocalStrategy from "passport-local"
import { ControllerUser } from "./../../../components/users/controller.js"
import Boom from "@hapi/boom"

const controller = new ControllerUser()

const localStrategy = new LocalStrategy({
  passReqToCallback: true,
},
  async (req, username, password, done) => {
    try {
      const user = await controller.findByUserName(username)
      if (!user) {
        return done(null, Boom.unauthorized("User not found"))
      }
      //compare password
      const match = user.password === password
      if (!match) {
        return done(null, Boom.unauthorized("Invalid password"))
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