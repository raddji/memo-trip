/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("comments", (table) => {
    table.bigIncrements("id").notNullable();
    table.bigInteger("memoTripId").notNullable().index().unsigned().references("memotrips.id");
    table.bigInteger("userId").notNullable().index().unsigned().references("users.id");
    table.string("commentAuthor").notNullable();
    table.text("commentText").notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("comments");
}
