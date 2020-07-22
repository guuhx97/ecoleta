import express from "express";
import ItemController from "./app/ItemController";
import PointController from "./app/PointController";

const routes = express.Router();

routes.get("/items", ItemController.index);

routes.post("/points", PointController.store);
routes.get("/points", PointController.index);
routes.get("/points/:id", PointController.show);

export default routes;
