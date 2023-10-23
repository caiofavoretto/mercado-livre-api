import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import ItemsController from "../controllers/ItemsController";

const itemsRouter = Router();
const itemsController = new ItemsController();

itemsRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().required(),
    },
  }),
  itemsController.index,
);

itemsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  itemsController.find,
);

export default itemsRouter;
