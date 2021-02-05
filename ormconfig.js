console.log(__dirname)
module.exports = {
  type: 'postgres',
  database: `przekupka_binance`,
  host: '10.9.96.3',
  port:5432,
  username:'postgres',
  password:'kurwaMac!',
  
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
