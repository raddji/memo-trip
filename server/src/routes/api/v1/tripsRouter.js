import express from "express"
import { Trip } from "../../../models/index.js"
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import tripHighlightsRouter from "./highlightsRouter.js";

const tripsRouter = new express.Router();

tripsRouter.get("/", async (req, res) => {
  try {
    const trips = await Trip.query();
    return res.status(200).json({ trips: trips });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

tripsRouter.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.query().findById(req.params.id)
    trip.highlights = await trip.$relatedQuery("highlights");
    return res.status(200).json({ trip: trip })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errors: errors })
  }
});
 
tripsRouter.post("/", async (req, res) => {
  try {
    const tripBody = cleanUserInput(req.body)
    const newTrip = await Trip.query().insertAndFetch(tripBody)
    debugger
    return res.status(201).json({ newTrip })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
      return res.status(500).json({ errors: error })
  }
})

tripsRouter.use("/:tripId/highlights", tripHighlightsRouter)

export default tripsRouter;