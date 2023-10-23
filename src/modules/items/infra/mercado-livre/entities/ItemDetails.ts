class ItemDetails {
  categories: Array<string>;

  item: {
    id: string;

    title: string;

    price: {
      currency: string;
      amount: number;
      decimals: number;
    };

    picture_url: string;

    condition: string;

    free_shipping: boolean;

    sold_qty: number;

    description: string;
  };
}

export default ItemDetails;
