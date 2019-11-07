'use strict'

class StoreUser {
  /**
   * Validation rules.
   */
  get rules () {
    return {
      'username': 'required|unique:users',
      'email':    'required|email|unique:users,email',
      'password': 'required',
    }
  }

  /**
   * Validate all fields.
   *
   * @return {boolean}
   */
  get validateAll () {
    return true
  }

  /**
   * Run when validation fails.
   *
   * @param {Array} messages
   */
  async fails (messages) {
    this.ctx.session.withErrors(messages)
      .flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = StoreUser
