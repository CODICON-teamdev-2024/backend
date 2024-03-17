import express, { Router } from "express"
import { validatorHandler } from "../../middleware/validSchema.js"
import { emotionCreate, emotionCreateAi, emotionFindEmotionId, emotionUpdate } from "./schema.js"
import { ControllerEmotion } from "./controller.js"
import { successResponse } from "../../middleware/response.js"
import Boom from "@hapi/boom"
import { setEmocionAiForDescription } from "../../utils/gpt/setEmotionAiForDescription.js"
import { decryptToken } from "../../middleware/decryptToken.js"


const controller = new ControllerEmotion()

const emotion = Router()

//buscar todos los usuarios
emotion.get("/",
  async (req, res, next) => {
    try {
      const rta = await controller.find()
      successResponse(req, res, rta, 200)
    } catch (error) {
      next(error)
    }
  })

//buscar usuario por id
emotion.get("/:id",
  validatorHandler(emotionFindEmotionId, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await controller.findById(id)
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
  decryptToken,
  validatorHandler(emotionCreate, "body"),
  async (req, res, next) => {
    try {
      const dataNewEmotion = req.body

      //miramos si tiene un id de usuario asociado
      const user = req?.user
      if (user?.id) dataNewEmotion.idUser = user.id

      const data = await controller.create(dataNewEmotion)
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

      //miramos si tiene un id de usuario asociado
      const user = req?.user
      if (user?.id) dataNewEmotion.idUser = user.id

      const data = await controller.create(dataNewEmotion)

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
  async (req, res, next) => {
    try {
      const { id } = req.params
      const changes = req.body
      const data = await controller.update(id, changes)
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
  async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await controller.delete(id)
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
