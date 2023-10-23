import { container } from "tsyringe";

import MercadoLivreDataProvider from "./implementations/MercadoLivreDataProvider";
import IDataProvider from "./models/IDataProvider";

const providers = {
  mercadoLivre: MercadoLivreDataProvider,
};

container.registerSingleton<IDataProvider>(
  "DataProvider",
  providers.mercadoLivre,
);
