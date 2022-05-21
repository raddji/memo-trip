/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("pics", (table) => {
    table.bigIncrements("id").primary()
    table.string("title").notNullable()
    table.string("image").notNullable()
    table.bigInteger("tripId").notNullable().unsigned().index().references("trips.id");
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("pics")
}
