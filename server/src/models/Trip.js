const Model = require("./Model.js")

class Trip extends Model {
  static get tableName() {
    return "trips"
  }

  static get jsonSchema() {
    return {
      type: "object", 
      required: ["name", "location", "trip_start", "trip_end"],
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        trip_start: { type: "string" },
        trip_end: { type: "string" },
      }
    };
  };
  
  static get relationMappings() {
    const { Highlight, Pic } = require("./index.js");

    return {
      highlights: {
        relation: Model.HasManyRelation,
        modelClass: Highlight,
        join: {
          from: "trips.id",
          to: "highlights.tripId"
        }
      },
      pics: {
        relation: Model.HasManyRelation,
        modelClass: Pic,
        join: {
          from: "trips.id",
          to: "pics.tripId"
        }
      }
    }
  }
};

module.exports = Trip;