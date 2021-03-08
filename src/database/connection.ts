import knex from 'knex'
const connection = knex({
    client: 'pg',
    connection: {
        database: 'chat',
        user: 'postgres',
        password: 'marcos'
    }
})

export default connection