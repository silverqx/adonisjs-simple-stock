'use strict'

class StoreProduct {
  /**
   * Validation rules.
   */
  get rules () {
    return {
      title:       'required',
      link:        'required',
      description: 'required',
    }
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

module.exports = StoreProduct
