'use strict'

/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/session/src/Session')} Session */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {View} ctx.view
   */
  async index ({ view }) {
    const products = await Product.all()

    return view.render('index', { products: products.toJSON() })
  }

  /**
   * Show a list of all user's products.
   * GET user's products
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Session} ctx.session
   * @param {View} ctx.view
   */
  async userIndex({ view, auth }) {
    // Fetch all user's jobs
    const products = await auth.user.products().fetch()

    return view.render('product.user_index', { products: products.toJSON() })
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   */
  async store ({ request, response, auth, session }) {
    const {
      title,
      link,
      description,
    } = request.all()

    const posted = await auth.user.products().create({
      title,
      link,
      description,
    })

    session.flash({ message: 'Your Product has been created.' })

    return response.redirect('back')
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {View} ctx.view
   */
  async edit ({ params, view }) {
    const product = await Product.find(params.id)

    return view.render('product.edit', { product })
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   */
  async update ({ params, request, response, session }) {
    const product = await Product.find(params.id)

    product.title = request.all().title
    product.link = request.all().link
    product.description = request.all().description

    await product.save()

    session.flash({ message: `Your Product '${product.title}' has been updated.` })

    return response.route('products.user_index')
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   */
  async destroy ({ params, response, session }) {
    const product = await Product.find(params.id)

    await product.delete()

    session.flash({ message: `Your Product '${product.title}' has been removed.` })

    return response.redirect('back')
  }
}

module.exports = ProductController
