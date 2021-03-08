import path from 'path'

module.exports = {
  client: 'pg',
  connection: {
    database: 'chat',
    user: 'postgres',
    password: 'marcos'
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  }
}