import GetItemByIdService from "@modules/items/services/GetItemByIdService";
import GetItemsByQueryService from "@modules/items/services/GetItemsByQueryService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ItemsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;

    const listByQuery = container.resolve(GetItemsByQueryService);

    const itemsList = await listByQuery.execute({
      search: search.toString(),
    });

    return response.json(itemsList);
  }

  async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const itemById = container.resolve(GetItemByIdService);

    const item = await itemById.execute({
      id,
    });

    return response.json(item);
  }
}
