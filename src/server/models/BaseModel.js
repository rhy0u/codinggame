import mapKeys from 'lodash/mapKeys'
import snakeCase from 'lodash/snakeCase'
import camelCase from 'lodash/camelCase'
import { Model, QueryBuilder } from 'objection'

export function mergeSchemas(...schemas) {
  return schemas.reduce(
    (mergedSchema, schema) => ({
      ...mergedSchema,
      ...schema,
      required: [...mergedSchema.required, ...schema.required],
      properties: {
        ...mergedSchema.properties,
        ...schema.properties,
      },
    }),
    {
      required: [],
      properties: {},
    },
  )
}

class ExtendedQueryBuilder extends QueryBuilder {
  searchUser(name, searchQuery) {
    return this.whereRaw(
      `(f_unaccent("${name}"."first_name") ~* f_unaccent(?) or f_unaccent("${name}"."last_name") ~* f_unaccent(?))`,
      [searchQuery, searchQuery],
    )
  }
}

export default class BaseModel extends Model {
  static get QueryBuilder() {
    return ExtendedQueryBuilder
  }

  // Uses http://json-schema.org/latest/json-schema-validation.html
  static jsonSchema = {
    type: 'object',
    required: [],
    properties: {
      id: { type: 'string' },
      created_at: { type: 'date' },
      updated_at: { type: 'date' },
    },
  }

  // Centralize the models.
  static modelPaths = [__dirname]

  // http://vincit.github.io/objection.js/#defaulteageralgorithm
  // static defaultEagerAlgorithm = Model.JoinEagerAlgorithm

  // Used by objection-rest
  static getFullIdColumn() {
    return 'id'
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }

  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json)

    return mapKeys(json, (value, key) => snakeCase(key))
  }

  $parseDatabaseJson(json) {
    json = mapKeys(json, (value, key) => camelCase(key))

    return super.$parseDatabaseJson(json)
  }
}
