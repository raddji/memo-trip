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
        what: { type: "string" },
        article: { type: "string" },
      }
    };
  };
  
  static get relationMappings() {
    const { Highlight, Pic, Comment } = require("./index.js");

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
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "memotrips.id",
          to: "comments.memotripId"
        }
      }
    }
  }
};

module.exports = MemoTrip;