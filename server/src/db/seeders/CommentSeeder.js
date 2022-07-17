import { Comment } from "../../models/index.js";

class CommentSeeder {
  static async seed() {
    const commentsData = [
      {
        memotripId: 1,
        userId: 1, 
        commentAuthor: "Marche",
        commentText: "Wow, love this, Rade! Miss you much. <3"
      },
      {
        memotripId: 2, 
        userId: 1, 
        commentAuthor: "Su",
        commentText: "Next time I'm coming with you!! Post some more pics, please."
      }
    ];
    for (const singleComment of commentsData) {
      const currentComment = await Comment.query().findOne(singleComment);
      if (!currentComment) {
        await Comment.query().insert(singleComment);
      }
    }
  }
}

export default CommentSeeder;