
class ControllerUser {
  constructor() {
    this.data = []

    //aquí se simula la base de datos con un array, pero usaríamos faker
    this.data.push({
      "id": "1",
      "username": "root",
      "password": "root123"
    })
    this.data.push({
      "id": "2",
      "username": "lauir@gmail.com",
      "password": "0fNNzdErugoXvTh"
    })
  }
  find() {
    try {
      return this.data
    } catch (error) {
      throw error
    }
  }
  findById(id) {
    try {
      //buscamos por el id del usuario
      const rta = this.data.find((item) => item.id === id)
      return rta
    } catch (error) {
      throw error
    }
  }
  findByUserName(username) {
    try {
      //buscamos por el id del usuario
      const rta = this.data.find((item) => item.username === username)
      return rta
    } catch (error) {
      throw error
    }
  }
  create(data) {
    try {
      //le agregamos un id al usuario
      data.id = String(this.data.length + 1)
      this.data.push(data)
      return data
    } catch (error) {
      throw error
    }
  }
  update(id, changes) {
    try {
      const index = this.data.findIndex((item) => item.id === id)
      if (index < 0) {
        return null
      }
      const user = this.data[index]
      this.data[index] = {
        ...user,
        ...changes,
      }
      return this.data[index]
    } catch (error) {
      throw error
    }
  }
  delete(id) {
    try {
      const index = this.data.findIndex((item) => item.id === id)
      if (index < 0) {
        return null
      }
      this.data.splice(index, 1)
      return { id }
    } catch (error) {
      throw error
    }
  }
}

export { ControllerUser }
