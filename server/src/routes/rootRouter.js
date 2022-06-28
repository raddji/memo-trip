import express from "express";
import googleMapsRouter from "./api/v1/googleMapsRouter.js";
import memoTripsRouter from "./api/v1/memoTripsRouter.js";
import nytRouter from "./api/v1/nytRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js"; 

const rootRouter = new express.Router();

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); 
rootRouter.use("/api/v1/memotrips", memoTripsRouter);
rootRouter.use("/api/v1/maps", googleMapsRouter);
rootRouter.use("/api/v1/articles", nytRouter);

rootRouter.use("/", clientRouter);

export default rootRouter;
