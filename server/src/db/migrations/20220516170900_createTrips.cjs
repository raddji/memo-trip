/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("trips", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.string("location").notNullable();
    table.string("when")
    table.timestamp("trip_begin_date").notNullable();
    table.timestamp("trip_end_date").notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("trips");
}
