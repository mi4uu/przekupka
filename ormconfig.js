console.log(__dirname)
const {provider} = require('./src/api/config')
module.exports = {
  type: 'postgres',
  database: `przekupka_${provider}`,
  host: '192.168.0.2',
  port:5432,
  username:'postgres',
  password:'qwerty',
  
  synchronize: true,
  logging: false,
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/db/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
}
