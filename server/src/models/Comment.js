const Model = require("./Model.js");

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["commentText", "commentAuthor"],
      properties: {
        commentText: { type: "string" },
        commentAuthor: { type: "string" },
      }
    }
  }

  static get relationMappings() {
    const { User, MemoTrip } = require("./index.js");
    return {
      memoTrip: {
        relation: Model.BelongsToOneRelation,
        modelClass: MemoTrip,
        join: {
          from: "comments.memotripId",
          to: "memotrips.id"
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Comment;