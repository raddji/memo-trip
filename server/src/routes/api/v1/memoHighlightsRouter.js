import express from 'express'
import { ValidationError } from 'objection';
import { Highlight } from "../../../models/index.js"
import cleanUserInput from '../../../services/cleanUserInput.js';

const memoHighlightsRouter = new express.Router({ mergeParams: true });

memoHighlightsRouter.post("/", async (req, res) => {
  const { memotripId } = req.params;
  try {
    const highlightsBody = req.body;
    const cleanedHighlightsBody = cleanUserInput(highlightsBody);
    const highlight = await Highlight.query().insertAndFetch({
      ...cleanedHighlightsBody,
      memotripId: memotripId
    })
    console.log(highlight)
    return res.status(201).json(highlight);
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    } 
    return res.status(500).json()({ errors: error });
  }
})

export default memoHighlightsRouter;