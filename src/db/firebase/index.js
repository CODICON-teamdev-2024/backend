import db from "./config.js";

class FirestoreDB {
  /**
   * Crea una instancia de FirestoreDB para una colección específica.
   * @param {string} collectionName - Nombre de la colección en Firestore.
   */
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  /**
   * Agrega un nuevo documento a la colección.
   * @param {Object} docData - Datos del documento a agregar.
   * @returns {Promise<admin.firestore.DocumentReference>} Referencia al documento agregado.
   */
  async addDocument(docData) {
    const docRef = await this.collection.add(docData);
    // console.log('Documento agregado con ID:', docRef.id);
    return docRef;
  }

  /**
   * Agrega o actualiza un documento con un ID específico.
   * @param {string} docId - El ID del documento a agregar o actualizar.
   * @param {Object} docData - Los datos del documento.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el documento se ha agregado o actualizado.
   */
  async setDocument(docId, docData) {
    const docRef = this.collection.doc(docId);
    const rta = await docRef.set(docData);
    return rta
  }

  /**
   * Obtiene un documento por su ID.
   * @param {string} docId - El ID del documento a obtener.
   * @returns {Promise<Object|null>} Los datos del documento o null si no existe.
   */
  async getDocument(docId) {
    const docRef = this.collection.doc(docId);
    const doc = await docRef.get();
    if (!doc.exists) {
      // console.log('No se encontró el documento!');
      return null;
    } else {
      console.log('Documento:', doc.data());
      return doc.data();
    }
  }

  /**
   * Actualiza un documento existente.
   * @param {string} docId - El ID del documento a actualizar.
   * @param {Object} newData - Los nuevos datos para el documento.
   * @returns {Promise<void>}
   */
  async updateDocument(docId, newData) {
    const docRef = this.collection.doc(docId);
    await docRef.update(newData);
    console.log('Documento actualizado');
  }

  /**
   * Elimina un documento de la colección.
   * @param {string} docId - El ID del documento a eliminar.
   * @returns {Promise<void>}
   */
  async deleteDocument(docId) {
    await this.collection.doc(docId).delete();
    console.log('Documento eliminado');
  }

  /**
   * Obtiene todos los documentos de la colección.
   * @returns {Promise<Array<Object>>} Un array de documentos.
   */
  async getAllDocuments() {
    const snapshot = await this.collection.get();
    const docs = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    // console.log(docs);
    return docs;
  }
  /**
  * Obtiene documentos de la colección que cumplen con los criterios de filtro especificados.
  * @param {string} field - El campo por el cual filtrar.
  * @param {string} operator - El operador de la comparación (p.ej., '==', '>', '<=', etc.).
  * @param {*} value - El valor para comparar contra el valor del campo.
  * @returns {Promise<Array<Object>>} Un array de documentos que cumplen con los criterios del filtro.
  */
  async getDocumentsByFilter(field, operator, value) {
    const querySnapshot = await this.collection.where(field, operator, value).get();
    const filteredDocs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    // console.log('Documentos filtrados:', filteredDocs);
    return filteredDocs;
  }
}

export default FirestoreDB;
