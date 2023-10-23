import { injectable, inject } from "tsyringe";

import QueryItems from "../infra/mercado-livre/entities/QueryItems";
import IItemsRepository from "../repositories/IItemsRepository";

interface IRequest {
  search: string;
}

@injectable()
class GetItemsByQueryService {
  constructor(
    @inject("ItemsRepository")
    private itemsReposityry: IItemsRepository,
  ) {}

  public async execute({ search }: IRequest): Promise<QueryItems> {
    const queryItems = await this.itemsReposityry.ListByquery(search);

    return queryItems;
  }
}

export default GetItemsByQueryService;
