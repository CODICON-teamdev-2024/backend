import Boom from "@hapi/boom";
import FirestoreDB from "../../db/firebase/index.js";

class ControllerEmotion {
  constructor() {
    this.COLLECTION_NAME = "emotions";
    this.db = new FirestoreDB(this.COLLECTION_NAME);
  }
  async find() {
    try {
      const emotions = await this.db.getAllDocuments()
      const rta = emotions.map(emotion => emotion.data)
      return rta
    } catch (error) {
      throw error
    }
  }
  async findById(id) {
    try {
      const emotion = await this.db.getDocument(id)
      if (!emotion) {
        throw Boom.notFound('emotion not found')
      }
      //buscamos por el id del usuario
      return emotion
    } catch (error) {
      throw error
    }
  }
  async findByUserId(id) {
    try {
      //consulta y filtramos todos los documentos que tengan el id del usuario
      const filter = ['idUser', '==', id]
      const emotions = await this.db.getDocumentsByFilter(...filter)
      const rta = emotions.map(emotion => emotion.data)
      return rta
    } catch (error) {
      throw error
    }
  }
  async create(data) {
    try {
      //le agregamos un id al usuario
      data.id = String(this.makeId())
      data.createdAt = new Date()
      const rta = await this.db.setDocument(data.id, data)
      return data
    } catch (error) {
      throw error
    }
  }
  async update(id, changes) {
    try {

      const emotion = await this.findById(id)
      const data = {
        ...emotion,
        ...changes
      }
      const rta = await this.db.setDocument(data.id, data)
      return data
    } catch (error) {
      throw error
    }
  }
  async delete(id) {
    try {
      const emotion = await this.findById(id)
      const rta = await this.db.deleteDocument(id)

      return { id }
    } catch (error) {
      throw error
    }
  }
  makeId(length = 5) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export { ControllerEmotion }
