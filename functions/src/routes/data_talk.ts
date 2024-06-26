import express from "express";
import { processUserCommand } from "../controllers/commands";
import { firebaseAuthorization } from "../middlewares";
import { check } from "../controllers/health";
import { hydrateChartOrTable } from "../controllers/data";

export const dataTalkRouter = express.Router();

dataTalkRouter.get("/health", check());
dataTalkRouter.post("/command", firebaseAuthorization(), processUserCommand);
dataTalkRouter.post("/hydrate", firebaseAuthorization(), hydrateChartOrTable);

