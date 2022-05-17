import express from "express"
import { Trip } from "../../models/index.js"

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
    return res.status(200).json({ trip: trip })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errors: errors })
  }
});

export default tripsRouter;