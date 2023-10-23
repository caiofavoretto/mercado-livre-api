import ItemDetails from "../infra/mercado-livre/entities/ItemDetails";
import QueryItems from "../infra/mercado-livre/entities/QueryItems";

export default interface IItemsRepository {
  findById(id: string): Promise<ItemDetails | undefined>;
  ListByquery(query: string): Promise<QueryItems>;
}
