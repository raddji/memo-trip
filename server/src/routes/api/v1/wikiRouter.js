import express from "express"

import WikiClient from "../../../apiClient/wikiClient.js";

const wikisRouter = new express.Router();

wikisRouter.get('/', async(req, res) => {
  const infoName = req.query.infoName
  try {
    // 1st easiest would be you perform the search on the backend here
    // for whereever the location is that the user provided
    // so no search initially for the user
    // get the data from Wiki and send to the React page to display

    // 2nd would be adding a search bar on the page for the user
    // then search on the backend here what ever the user submitted in the search form
    const query = "Japan"
    const url = `${baseUrl}/search?api_key=${wikiApiKey}&q=${query}`
    const apiResponse = await got(url)
    const responseBody = apiResponse.body
    const wikiData = JSON.parse(responseBody)
    const wikiUrls = wikiData.data.map((wiki) => {
      return wiki.title
    })
    //debugger
    console.log(wikiUrls)

    const wikisResponse = await WikiClient.getWikis("something")

    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(wikiUrls)
  } catch (error) {
    return res.status(401).json({ errors: error })

  }
})

export default wikisRouter;