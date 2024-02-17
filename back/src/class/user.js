class User {
  static _list = []

  constructor({ email, password }) {
    this.email = email
    this.password = password
  }

  static create(data) {
    const user = new User(data)
    console.log(user)
    this._list.push(user)
    console.log(this._list)
    return user
  }

  static getByEmail(email) {
    return (
      this._list.find((user) => user.email === email) ||
      null
    )
  }
}

module.exports = {
  User,
}
