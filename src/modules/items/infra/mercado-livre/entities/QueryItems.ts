class QueryItems {
  query: string;

  categories: Array<string>;

  items: {
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
  }[];
}

export default QueryItems;
