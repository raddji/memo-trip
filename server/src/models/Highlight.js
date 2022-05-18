const Model = require("./Model.js")

class Highlight extends Model {
  static get tableName() {
    return "highlights"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["tripId"],
      properties: {
        dining: { type: "string" },
        activity: { type: "string" },
        note: { type: "string" },
        tripId: { type: "integer" }
      }
    }
  }

  static get relationMappings() {
    const { Trip } = require("./index.js");
    return {
      trip: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trip, 
        join: {
          from: "highlights.tripId",
          to: "trips.id"
        }
      }
    }
  }
}

module.exports = Highlight;