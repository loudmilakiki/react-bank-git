class User {
  static USER = {
    USER: 1,
  }

  static #list = []

  constructor({ email, password }) {
    this.email = email
    this.password = password
  }

  static create(data) {
    const user = new User(data)

    this.#list.push(user)
  }
}

module.export = {
  User,
}
