import express from "express"

import GoogleMapsClient from "../../../apiClient/googleMapsClient.js";

const googleMapsRouter = new express.Router();

googleMapsRouter.get('/', async (req, res) => {
  const address = req.query.address;

  try {
    const googleMapsResponse = await GoogleMapsClient.getAddress(address);
    const googleMapsData = JSON.parse(googleMapsResponse);
    return res 
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(googleMapsData)
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default googleMapsRouter;