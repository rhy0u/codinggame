/* eslint-disable no-console */

const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
client.query(
  `DROP DATABASE IF EXISTS ${process.env.NODE_ENV || 'development'}`,
  (err, res) => {
    console.log(err, res)
    client.end()
  },
)
