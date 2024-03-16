import express, { Router } from "express"
import { validatorHandler } from "../../middleware/validSchema.js"
import { userCreate, userFindUserId, userUpdate } from "./schema.js"
import { ControllerUser } from "./controller.js"
import { successResponse } from "../../middleware/response.js"
import { passport } from "./../../middleware/passport/index.js"
import { createToken } from "../../utils/bcrypt/createToken.js"

const controller = new ControllerUser()

const user = Router()

//login
user.post('/login',
  validatorHandler(userCreate, "body"),
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      //devolvemos el token
      const token = createToken(req.user)
      res.set('Authorization', `Bearer ${token}`);
      const rta = {
        token: token,
      }
      successResponse(req, res, rta, 200)
    } catch (error) {
      next(error)
    }
  }
)

//buscar todos los usuarios
user.get("/",
  (req, res, next) => {
    try {
      const rta = controller.find()
      successResponse(req, res, rta, 200)
    } catch (error) {
      next(error)
    }
  })

//buscar usuario por id
user.get("/:id",
  validatorHandler(userFindUserId, "params"),
  (req, res, next) => {
    try {
      const { id } = req.params
      const data = controller.findById(id)
      const rta = {
        body: data,
        message: `The user with id ${id} has been found successfully.`,
      }
      successResponse(req, res, rta)
    } catch (error) {
      next(error)
    }
  })

//crear usuario
user.post("/",
  validatorHandler(userCreate, "body"),
  (req, res, next) => {
    try {
      const dataNewUser = req.body
      const data = controller.create(dataNewUser)
      const rta = {
        body: data,
        message: "The user has been created successfully.",
      }
      successResponse(req, res, rta, 201)
    } catch (error) {
      next(error)
    }
  })


//actualizar usuario
user.patch("/:id",
  validatorHandler(userFindUserId, "params"),
  validatorHandler(userUpdate, "body"),
  (req, res, next) => {
    try {
      const { id } = req.params
      const changes = req.body
      const data = controller.update(id, changes)
      const rta = {
        body: data,
        message: `The user with id ${id} has been updated successfully.`,
      }
      successResponse(req, res, rta)
    } catch (error) {
      next(error)
    }
  })

//eliminar usuario
user.delete("/:id",
  validatorHandler(userFindUserId, "params"),
  (req, res, next) => {
    try {
      const { id } = req.params
      const data = controller.delete(id)
      const rta = {
        body: data,
        message: `The user with id ${id} has been deleted successfully.`,
      }
      successResponse(req, res, rta)
    } catch (error) {
      next(error)
    }
  })
export { user }
