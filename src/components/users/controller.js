import bcrypt from 'bcrypt';
import FirestoreDB from '../../db/firebase/index.js';
import Boom from '@hapi/boom';

class ControllerUser {
  constructor() {
    this.COLLECTION_NAME = "users";
    this.db = new FirestoreDB(this.COLLECTION_NAME);
  }
  async find() {
    try {
      const users = await this.db.getAllDocuments()
      const rta = users.map(user => user.data)
      return rta
    } catch (error) {
      throw error
    }
  }
  async findById(id) {
    try {
      const user = await this.db.getDocument(id)
      if (!user) {
        throw Boom.notFound('User not found')
      }
      //buscamos por el id del usuario
      return user
    } catch (error) {
      throw error
    }
  }
  async findByUserName(username) {
    try {
      //buscamos por el id del usuario
      const user = await this.db.getDocumentsByFilter("username", "==", username)
      if (user.length === 0) {
        throw Boom.notFound('User not found')
      }
      return user[0].data
    } catch (error) {
      throw error
    }
  }
  async create(data) {
    try {
      //le agregamos un id al usuario
      data.id = String(this.makeId())
      //encriptamos la contraseña
      data.password = await bcrypt.hash(data.password, 10)
      //agregamos el usuario a la base de datos
      const rta = await this.db.setDocument(data.id, data)
      delete data.password
      return data
    } catch (error) {
      throw error
    }
  }
  async update(id, changes) {
    try {

      const user = await this.findById(id)
      const data = {
        ...user,
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
      const user = await this.findById(id)
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

export { ControllerUser }
