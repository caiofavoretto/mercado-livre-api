import IItemsRepository from "@modules/items/repositories/IItemsRepository";
import { inject, injectable } from "tsyringe";

import IDataProvider from "@shared/container/providers/DataProvider/models/IDataProvider";

import ItemDetails from "../entities/ItemDetails";
import QueryItems from "../entities/QueryItems";
import ItemFromQuerySchema from "../schemas/ItemFromQuerySchema";
import ItemSchema from "../schemas/ItemSchema";

interface IQueryApiResponse {
  query: string;
  results: ItemFromQuerySchema[];
}

interface IFindApiResponse {
  body: ItemSchema;
}

interface ICategoriesApiResponse {
  path_from_root: {
    id: string;
    name: string;
  }[];
}

@injectable()
class ItemsRepository implements IItemsRepository {
  constructor(
    @inject("DataProvider")
    private dataProvider: IDataProvider,
  ) {}

  public async findById(id: string): Promise<ItemDetails | undefined> {
    const response = await this.dataProvider.get<IFindApiResponse[]>("/items", {
      params: {
        ids: id,
      },
    });

    if (!response.data[0].body?.id) {
      return undefined;
    }

    const itemSchema = response.data[0];

    /* A partir do id da catgeoria do produto, obtém as categorias
    relacionadas para gerar uma cadeia de categorias */
    const categoriesResponse =
      await this.dataProvider.get<ICategoriesApiResponse>(
        `/categories/${itemSchema.body?.category_id}`,
      );

    const itemDetails = new ItemDetails();

    Object.assign(itemDetails, {
      categories: categoriesResponse.data.path_from_root.map(
        (category) => category.name,
      ),
      item: {
        id: itemSchema.body.id,
        title: itemSchema.body.title,
        price: {
          currency: `BRL`,
          amount: Number(itemSchema.body.price.toFixed(2).split(".")[0]),
          decimals: Number(itemSchema.body.price.toFixed(2).split(".")[1]),
        },
        picture_url: itemSchema.body.pictures[0].url, // Obtive a primeira imagem do produto para melhor resolução
        condition: itemSchema.body.condition,
        free_shipping: itemSchema.body.shipping.free_shipping,
        sold_qty: itemSchema.body.sold_quantity,
        description: itemSchema.body.descriptions[0], // Não consegui encontrar nenhum produto com descrição para que eu pudesse ver um exemplo
      },
    });

    return itemDetails;
  }

  public async ListByquery(query: string): Promise<QueryItems> {
    const response = await this.dataProvider.get<IQueryApiResponse>(
      "/sites/MLB/search",
      {
        params: {
          q: query,
        },
      },
    );

    const itemFromQuerySchema = response.data;

    /* Neste caso, obtive o ID da categoria do primeiro produto sugerido,
    já que não encontrei outras maneiras de buscar um encadeamento de categorias
    pensei em utilizar os filtros disponíveis, mas nem sempre esta opção tras
    resultados */
    const categoriesResponse =
      await this.dataProvider.get<ICategoriesApiResponse>(
        `/categories/${itemFromQuerySchema.results[0].category_id}`,
      );

    const queryItems = new QueryItems();

    Object.assign(queryItems, {
      query: itemFromQuerySchema.query,
      categories: categoriesResponse.data.path_from_root.map(
        (category) => category.name,
      ),
      items: itemFromQuerySchema.results.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: `BRL`,
          amount: Number(item.price.toFixed(2).split(".")[0]),
          decimals: Number(item.price.toFixed(2).split(".")[1]),
        },
        picture_url: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    });

    return queryItems;
  }
}

export default ItemsRepository;
