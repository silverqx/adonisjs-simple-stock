'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()

      table.integer('user_id').unsigned()
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')

      table.string('title')
      table.string('description')
      table.string('link').comment('URI to product')

      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('products')
  }
}

module.exports = ProductsSchema
