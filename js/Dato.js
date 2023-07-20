class Dato {
  constructor(descripcion, valor) {
    // Aquí puedes inicializar las propiedades de la clase padre
    this._descripcion = descripcion;
    this._valor = valor;
  }
  // Aquí puedes agregar los métodos que necesites para manejar los datos
  get descripcion() {
    return this._descripcion;
  }

  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }

  get valor() {
    return this._valor;
  }

  set valor(valor) {
    this.valor = valor;
  }
}
