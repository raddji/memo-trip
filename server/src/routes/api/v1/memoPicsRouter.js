import express from "express"
import { ValidationError } from "objection"
import { Pic } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import uploadImage from "../../../services/uploadImage.js";

const memoPicsRouter = new express.Router({ mergeParams: true });

memoPicsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const { memotripId } = req.params;
  try {
    const { body } = req
    const bodyInput = await cleanUserInput(body)
    
    const formData = {
      ...bodyInput,
      image: req.file.location,
      userId: req.user.id,
      memotripId: memotripId
    }
    // console.log(formData)
    // console.log(req.file)

    const pic = await Pic.query().insertAndFetch(formData)
    return res.status(201).json({ pic })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default memoPicsRouter;