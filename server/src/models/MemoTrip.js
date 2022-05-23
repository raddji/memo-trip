const Model = require("./Model.js")

class MemoTrip extends Model {
  static get tableName() {
    return "memotrips"
  }

  static get jsonSchema() {
    return {
      type: "object", 
      required: ["name", "where", "when", "what"],
      properties: {
        name: { type: "string" },
        where: { type: "string" },
        when: { type: "string" },
        what: { type: "string" }
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
          from: "memotrips.id",
          to: "highlights.memotripId"
        }
      },
      pics: {
        relation: Model.HasManyRelation,
        modelClass: Pic,
        join: {
          from: "memotrips.id",
          to: "pics.memotripId"
        }
      }
    }
  }
};

module.exports = MemoTrip;