const Model = require("./Model.js")

class Trip extends Model {
  static get tableName() {
    return "trips"
  }

  static get jsonSchema() {
    return {
      type: "object", 
      required: ["name", "location", "date"],
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        date: { type: "string" },
      }
    };
  };
  
  static get relationMappings() {
    const { Highlight } = require("./index.js");

    return {
      highlights: {
        relation: Model.HasManyRelation,
        modelClass: Highlight,
        join: {
          from: "trips.id",
          to: "highlights.tripId"
        }
      }
    }
  }
};

module.exports = Trip;