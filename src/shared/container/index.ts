import "./providers";

import ItemsRepository from "@modules/items/infra/mercado-livre/repositories/ItemsRepository";
import IItemsRepository from "@modules/items/repositories/IItemsRepository";
import { container } from "tsyringe";

container.registerSingleton<IItemsRepository>(
  "ItemsRepository",
  ItemsRepository,
);
