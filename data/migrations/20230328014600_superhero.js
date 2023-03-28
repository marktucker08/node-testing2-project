/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema 
    .createTable('superheros', tbl => {
        tbl.increments('superhero_id')
        tbl.text('name')
            .notNullable()
        tbl.integer('age')
            .notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('superheros')
};
