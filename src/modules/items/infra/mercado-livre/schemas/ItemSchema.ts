class ItemSchema {
  id: string;

  title: string;

  price: number;

  available_quantity: number;

  thumbnail: string;

  condition: string;

  shipping: {
    free_shipping: boolean;
  };

  sold_quantity: number;

  descriptions: string[];

  category_id: string;

  pictures: {
    url: string;
  }[];
}

export default ItemSchema;
