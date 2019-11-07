'use strict'

/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/session/src/Session')} Session */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');

class UserController {
  /**
   * Create/save a new user.
   * POST products
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const user = await User.create(request.only(['username', 'email', 'password']))

    await auth.login(user)

    return response.route('products.user_index')
  }

  /**
   * Login user.
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   */
  async login ({ request, auth, response, session }) {
    const { email, password } = request.all()

    try {
      await auth.attempt(email, password)
      return response.route('products.user_index')
    } catch (error) {
    }

    session.flash({ loginError: 'These credentials do not work.' })
    return response.redirect('/login')
  }

  /**
   * Show login form.
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async loginShow ({ auth, response, view }) {
    // Redirect to home if a user is logged in
    try {
      if (await auth.check())
        return response.route('home')
    } catch (error) {
    }

    return view.render('auth.login')
  }

  /**
   * Show register form.
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async register ({ auth, response, view }) {
    // Redirect to home if a user is logged in
    try {
      if (await auth.check())
        return response.route('home')
    } catch (error) {
    }

    return view.render('auth.register')
  }
}

module.exports = UserController
