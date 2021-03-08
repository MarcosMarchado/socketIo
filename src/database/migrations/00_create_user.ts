import { Knex } from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary()
        table.string('nickname').notNullable().unique()
        table.string('password').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user')
}