const Model = require("./Model.js")

class Highlight extends Model {
  static get tableName() {
    return "highlights"
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        dining: { type: "string" },
        activity: { type: "string" },
        note: { type: "string" },
        memotripId: { type: ["string", "integer"] }
      }
    }
  }

  static get relationMappings() {
    const { MemoTrip } = require("./index.js");
    return {
      memoTrip: {
        relation: Model.BelongsToOneRelation,
        modelClass: MemoTrip, 
        join: {
          from: "highlights.memotripId",
          to: "memotrips.id"
        }
      }
    }
  }
}

module.exports = Highlight;