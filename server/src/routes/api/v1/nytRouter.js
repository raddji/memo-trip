import express from "express";
import nytClient from "../../../apiClient/nytClient.js";

const nytRouter = new express.Router();

nytRouter.get("/", async (req, res) => {
  const article = req.query.article

  try {
    const nytResponse = await nytClient.getArticle(article);
    const articleData = JSON.parse(nytResponse);
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(articleData);
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default nytRouter;