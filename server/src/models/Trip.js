const Model = require("./Model.js")

class Trip extends Model {
  static get tableName() {
    return "trips"
  }

  static get jsonSchema() {
    return {
      type: "object", 
      required: ["name", "location", "trip_begin_date"],
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        when: { type: "string" },
        trip_begin_date: { type: "string" },
        trip_end_date: { type: "string" }
      }
    };
  };
};

module.exports = Trip;