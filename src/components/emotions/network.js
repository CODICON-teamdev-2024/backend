import express, { Router } from "express"
import { validatorHandler } from "../../middleware/validSchema.js"
import { emotionCreate, emotionFindEmotionId, emotionUpdate } from "./schema.js"
import { ControllerUser } from "./controller.js"
import { successResponse } from "../../middleware/response.js"


const controller = new ControllerUser()

const emotion = Router()

//buscar todos los usuarios
emotion.get("/",
  (req, res, next) => {
    try {
      const rta = controller.find()
      successResponse(req, res, rta, 200)
    } catch (error) {
      next(error)
    }
  })

//buscar usuario por id
emotion.get("/:id",
  validatorHandler(emotionFindEmotionId, "params"),
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
emotion.post("/",
  validatorHandler(emotionCreate, "body"),
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
emotion.patch("/:id",
  validatorHandler(emotionFindEmotionId, "params"),
  validatorHandler(emotionUpdate, "body"),
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
emotion.delete("/:id",
  validatorHandler(emotionFindEmotionId, "params"),
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
export { emotion }
