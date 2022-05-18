/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("highlights", (table) => {
    table.bigIncrements("id").notNullable();
    table.string("dining");
    table.string("activity");
    table.text("note");
    table.bigInteger("tripId").notNullable().index().unsigned().references("trips.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("highlights");
};
