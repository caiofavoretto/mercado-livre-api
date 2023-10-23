class ItemFromQuerySchema {
  id: string;

  title: string;

  price: number;

  currency_id: string;

  available_quantity: number;

  thumbnail: string;

  condition: string;

  shipping: {
    free_shipping: boolean;
  };

  category_id: string;

  available_filters: {
    id: string;
  }[];
}

export default ItemFromQuerySchema;
