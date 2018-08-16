import path from 'path'
import convict from 'convict'
import { existsSync } from 'fs'
import pick from 'lodash/pick'

const LOCAL_CONFIG_PATH = path.join(__dirname, `../../config.json`)
const DEFAULT_PUBLIC_PATH = path.join(__dirname, '../../public')

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  redis: {
    url: {
      doc: 'Redis url',
      format: String,
      default: 'redis://localhost:6379/1',
      env: 'REDIS_URL',
    },
  },
  server: {
    secure: {
      doc: 'Specify if the server is using https or not.',
      format: Boolean,
      default: false,
    },
    externalUrl: {
      doc: 'The server external url',
      format: 'url',
      default: 'https://www.beangels.be',
      env: 'EXTERNAL_URL',
    },
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
    publicPath: {
      doc: 'The public path',
      format: String,
      default: DEFAULT_PUBLIC_PATH,
    },
    sessionSecret: {
      doc: 'Session secret',
      format: String,
      default: 'the secret is here',
    },
  },
  mailer: {
    from: {
      doc: 'Default from',
      format: String,
      default: '"Beangels" <no-reply@beangels.be>',
    },
    host: {
      doc: 'SMTP host',
      format: String,
      default: '',
      env: 'SMTP_HOST',
    },
    port: {
      doc: 'SMTP port',
      format: 'port',
      default: 587,
    },
    secure: {
      doc: 'SMTP SSL',
      format: Boolean,
      default: false,
    },
    auth: {
      user: {
        doc: 'SMTP user',
        format: String,
        default: '',
        env: 'SMTP_USER',
      },
      pass: {
        doc: 'SMTP password',
        format: String,
        default: '',
        env: 'SMTP_PASSWORD',
      },
    },
  },
  uploads: {
    directory: {
      doc: 'Upload directory',
      format: String,
      default: path.resolve(__dirname, '../../public/uploads'),
    },
    publicPath: {
      doc: 'Upload path',
      format: String,
      default: '/uploads',
    },
  },
  graphql: {
    graphiql: {
      doc: 'Enable GraphiQL',
      format: Boolean,
      default: false,
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `../../config/${env}.json`))

if (existsSync(LOCAL_CONFIG_PATH)) {
  config.loadFile(LOCAL_CONFIG_PATH)
}

config.validate()

export const getClientConfig = () => ({
  baseUrl: config.get('server.externalUrl'),
})

export const getClientUser = user =>
  user ? pick(user, ['id', 'email', 'firstName', 'lastName', 'roles']) : null

export default config
