declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
    };
    auth: {
      uuid_grupo_economico: string;
      created_by: string;
      updated_by: string;
    };
  }
}
