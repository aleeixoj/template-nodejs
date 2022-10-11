interface IApiDataOut {
  data: {
    items: any[];
    total: number;
  };
  msg?: string;
  returned: boolean;
}

export { IApiDataOut };
