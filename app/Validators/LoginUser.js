'use strict'

class LoginUser {
  /**
   * Validation rules.
   */
  get rules () {
    return {
      'email':    'required|email',
      'password': 'required',
    }
  }

  // get messages () {
  //   return {
  //     'required': 'Woah now, {{ field }} is required.',
  //   }
  // }

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

module.exports = LoginUser
