import express from "express"
import MemoSerializer from "../../../../serializers/MemoSerializer.js";
import { MemoTrip } from "../../../models/index.js"
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import memoHighlightsRouter from "./memoHighlightsRouter.js";
import memoPicsRouter from "./memoPicsRouter.js"
import memoCommentsRouter from "./memoCommentsRouter.js";

const memoTripsRouter = new express.Router();

memoTripsRouter.get("/", async(req, res) => {
  try {
    const memoTrips = await MemoTrip.query()
    const serializedMemoTrips = await Promise.all(memoTrips.map(async (memoTrip) => {
      return await MemoSerializer.getSummary(memoTrip)
    })
  )
  res.status(200).json({ memoTrips: serializedMemoTrips })
  } catch (err) {
    res.status(500).json({ errors: err })
  }
})

memoTripsRouter.get("/:id", async (req, res) => {
  try {
    const memoTrip = await MemoTrip.query().findById(req.params.id);
    memoTrip.highlights = await memoTrip.$relatedQuery("highlights");
    memoTrip.pics = await memoTrip.$relatedQuery("pics");
    return res.status(200).json({ memoTrip: memoTrip })
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errors: errors })
  }
});

memoTripsRouter.post("/", async (req, res) => {
  try {
    const memoTripBody = cleanUserInput(req.body)
    const newMemoTripData = await MemoTrip.query().insertAndFetch(memoTripBody)
    return res.status(201).json({ newMemoTripData })
  } catch (error) {
      console.log(error)
      if (error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
      return res.status(500).json({ errors: error })
  }
})

memoTripsRouter.use("/:memotripId/highlights", memoHighlightsRouter)
memoTripsRouter.use("/:memotripId/pics", memoPicsRouter)
memoTripsRouter.use("/:memotripId/comments", memoCommentsRouter)

export default memoTripsRouter;