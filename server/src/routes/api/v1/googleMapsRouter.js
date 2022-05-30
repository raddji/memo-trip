import express from "express"

import GoogleMapsClient from "../../../apiClient/googleMapsClient.js";

const googleMapsRouter = new express.Router();

googleMapsRouter.get('/', async (req, res) => {
  // const userInput = req.query.searchBarInput;
  const userInput = "Boston";

  try {
    const googleMapsResponse = await GoogleMapsClient.getAddress(userInput);
    const googleMapsData = JSON.parse(googleMapsResponse);
    console.log("backend res from got:", googleMapsData)
    return res 
    .set({ "Content-Type": "application/json" })
    .status(200)
    .json(googleMapsData)
    
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default googleMapsRouter;