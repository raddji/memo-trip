/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("memotrips", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.string("where").notNullable();
    table.date("when").notNullable();
    table.text("what").notNullable();
    table.string("article")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("memotrips");
}
