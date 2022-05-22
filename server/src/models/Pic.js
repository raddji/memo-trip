const Model = require("./Model.js")

class Pic extends Model {
  static get tableName() {
    return "pics"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "image", "memotripId"],
      properties: {
        title: { type: "string" },
        image: { type: "string" },
        userId: { type: ["integer", "string"] },
        memotripId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { User, Trip } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User, 
        join: {
          from: "pics.userId",
          to: "users.id"
        }
      },
      trip: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trip,
        join: {
          from: "pics.tripId",
          to: "trips.id"
        }
      }
    }
  }
}

module.exports = Pic;