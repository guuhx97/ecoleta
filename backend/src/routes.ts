import { celebrate, Joi } from "celebrate";
import express from "express";
import multer from "multer";
import ItemController from "./app/ItemController";
import PointController from "./app/PointController";
import multerConfig from "./config/multer";

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/items", ItemController.index);

routes.post(
  "/points",
  upload.single("image"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    }),
  }),
  PointController.store
);
routes.get("/points", PointController.index);
routes.get("/points/:id", PointController.show);

export default routes;
