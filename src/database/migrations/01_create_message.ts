import { Knex } from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('message', table => {
        table.increments('id').primary()
        table.integer('user_target_id').notNullable()
        table.integer('user_sender_id').notNullable()
        table.string('message').notNullable()
        table.boolean('read')
            .notNullable()
            .defaultTo(false)
        table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('message')
}