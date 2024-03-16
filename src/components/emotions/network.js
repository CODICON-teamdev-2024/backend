import express, { Router } from "express"
import { validatorHandler } from "../../middleware/validSchema.js"
import { emotionCreate, emotionCreateAi, emotionFindEmotionId, emotionUpdate } from "./schema.js"
import { ControllerUser } from "./controller.js"
import { successResponse } from "../../middleware/response.js"
import Boom from "@hapi/boom"
import { setEmocionAiForDescription } from "../../utils/gpt/setEmotionAiForDescription.js"


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

emotion.post("/",
  //puede o no tener un token valido con el id de usuario asociado
  validatorHandler(emotionCreate, "body"),
  (req, res, next) => {
    try {
      const dataNewEmotion = req.body
      //miramos si tiene un id de usuario asociado
      if (req?.user?.id) dataNewEmotion.idUser = req.user.id

      const data = controller.create(dataNewEmotion)
      const rta = {
        body: data,
        message: "The new emotion has been created successfully.",
      }
      successResponse(req, res, rta, 201)
    } catch (error) {
      next(error)
    }
  })

emotion.post("/ai",
  //debe de tener un token valido con el id de usuario para asociar la emocion
  validatorHandler(emotionCreateAi, "body"),
  async (req, res, next) => {
    try {
      const description = req.body.description
      //creamos una nuevo emocion según la descripción que recibimos
      const dataNewEmotion = await setEmocionAiForDescription(description)

      if (req?.user?.id) dataNewEmotion.idUser = req.user.id
      const data = controller.create(dataNewEmotion)

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
