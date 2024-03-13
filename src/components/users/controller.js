
class ControllerUser {
  constructor() {
    this.data = []

    //aquí se simula la base de datos con un array, pero usaríamos faker
    this.data.push({
      "id": "1",
      "name": "Francesca_Krak",
      "email": "Moshe32@yahoo.com",
      "password": "0fNNzdErugoXvTh"
    })
    this.data.push({
      "id": "2",
      "name": "Laurina",
      "email": "lauir@gmail.com",
      "password": "0fNNzdErugoXvTh"
    })
  }
  find() {
    return this.data
  }
  findById(id) {
    //buscamos por el id del usuario
    const rta = this.data.find((item) => item.id === id)
    return rta
  }
  create(data) {
    //le agregamos un id al usuario
    data.id = String(this.data.length + 1)
    this.data.push(data)
    return data
  }
  update(id, changes) {
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
  }
  delete(id) {
    const index = this.data.findIndex((item) => item.id === id)
    if (index < 0) {
      return null
    }
    this.data.splice(index, 1)
    return { id }
  }
}

export { ControllerUser }
