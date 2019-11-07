'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'ProductController.index').as('home')
Route.get('products', 'ProductController.index').as('products.index')

Route.resource('products', 'ProductController').only(['store', 'edit', 'update', 'destroy']).middleware('auth').validator(new Map([
  [['products.store', 'products.update'], ['StoreProduct']],
]))
Route.group(() => {
  Route.get('user_index', 'ProductController.userIndex').as('products.user_index')
  // Route.post('products/store', 'ProductController.store').validator('StoreProduct')
  // Route.get('products/delete/:id', 'ProductController.destroy')
  // Route.get('products/edit/:id', 'ProductController.edit')
  // Route.post('products/update/:id', 'ProductController.update').validator('StoreProduct')
}).middleware('auth').prefix('products')

Route.get('register', 'UserController.register').as('register')
Route.get('login', 'UserController.loginShow').as('login')
Route.group(() => {
  Route.post('register', 'UserController.store').validator('StoreUser')
  Route.post('login', 'UserController.login').validator('LoginUser')
}).middleware('guest')
Route.get('logout', async ({ auth, response }) => {
  await auth.logout()
  return response.redirect('/')
}).as('logout').middleware('auth')
