exports.up = async knex =>
  knex.schema.createTable('brigades', table => {
    table.bigIncrements('id').primary()
    table.string('name')
  })

exports.down = async knex => knex.schema.dropTableIfExists('brigades')
