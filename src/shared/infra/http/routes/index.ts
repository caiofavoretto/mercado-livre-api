import itemsRouter from "@modules/items/infra/http/routes/items.routes";
import { Router } from "express";

const routes = Router();

routes.use("/items", itemsRouter);

export default routes;
