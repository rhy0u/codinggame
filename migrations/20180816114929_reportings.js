exports.up = async knex =>
  knex.schema.createTable('reportings', table => {
    table.bigIncrements('id').primary()
    table
      .string('slot')
      .unique()
      .notNull()
    table
      .string('alerter')
      .notNull()
      .unique()
    table.enum('animal', ['chat', 'chien', 'lapin', 'perroquet'])
    table.string('couleur')
    table.string('address')
    table.enum('state', ['Très faible', 'Faible', 'Moyen', 'Bon'])
    table.boolean('collar')
    table.timestamps(false, true)
  })

exports.down = async knex => knex.schema.dropTableIfExists('reportings')
