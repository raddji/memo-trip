import express from "express"

const wikiRouter = new express.Router();
const wikiURL = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=%27New_England_Patriots%27";

wikiRouter.get(wikiURL, async(req, res) => {
  try {
    const wikipedia = 
  } catch (error) {

  }
})


export default wikiRouter;