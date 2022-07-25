import express from 'express';
import { Comment } from "../../../models/index.js";
import cleanUserInput from '../../../services/cleanUserInput.js';
import { ValidationError } from 'objection';

const memoCommentsRouter = new express.Router({ mergeParams: true });

memoCommentsRouter.post("/", async (req, res) => {
  const { memoTripId } = req.params;
  try {
    const commentBody = req.body;
    const cleanBodyData = cleanUserInput(commentBody);
    const comment = await Comment.query().insertAndFetch({
      ...cleanBodyData,
      memoTripId: memoTripId,
      userId: req.user.id,
    });
    return res.status(201).json({ comment:  comment });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: error });
  }
});

export default memoCommentsRouter;