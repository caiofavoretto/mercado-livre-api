import { injectable, inject } from "tsyringe";

import ItemDetails from "../infra/mercado-livre/entities/ItemDetails";
import IItemsRepository from "../repositories/IItemsRepository";

interface IRequest {
  id: string;
}

@injectable()
class GetItemByIdService {
  constructor(
    @inject("ItemsRepository")
    private itemsReposityry: IItemsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ItemDetails> {
    const itemDetails = await this.itemsReposityry.findById(id);

    return itemDetails;
  }
}

export default GetItemByIdService;
