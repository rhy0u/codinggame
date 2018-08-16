/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import config from 'server/config'
import { connect as connectDatabase } from 'server/services/database'

console.clear()
connectDatabase()

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  next()
})

app.use(bodyParser.json())

app.listen(config.get('server.port'), () =>
  console.info('listenning on http://localhost:8000'),
)
