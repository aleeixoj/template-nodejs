abstract class PrepareN2NRelation {
  static execute(data: any, attribIN: string, attribOut: string): any {
    const novoDado: any = { ...data };
    novoDado[attribOut] = [];
    novoDado[attribIN].map((item: any) => {
      novoDado[attribOut].push(item.uuid);
      return true;
    });
    delete novoDado[attribIN];
    return novoDado;
  }
}

export { PrepareN2NRelation };
