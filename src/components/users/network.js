import express, { Router } from "express"
import { validatorHandler } from "../../middleware/validSchema.js"
import { userCreate, userFindUserId, userUpdate } from "./schema.js"
import { ControllerUser } from "./controller.js"

const controller = new ControllerUser()

const user = Router()

user.get("/",
  // middleware
  // validatorHandler(userSchema, "body"),
  (req, res, next) => {
    try {
      const rta = controller.find()
      res.json(rta)
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
      const rta = controller.findById(id)
      res.json(rta)
    } catch (error) {
      console.log(`Error: ${error}`)

      next(error)
    }
  })

//crear usuario
user.post("/",
  validatorHandler(userCreate, "body"),
  (req, res, next) => {
    try {
      const dataNewUser = req.body
      const rta = controller.create(dataNewUser)

      res.json(rta)
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
      const rta = controller.update(id, changes)
      res.json(rta)
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
      const rta = controller.delete(id)
      res.json(rta)
    } catch (error) {
      next(error)
    }
  })
export { user }
