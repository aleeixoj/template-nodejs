import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { apiPattern } from '@shared/utils/api.pattern';

class DefaultDeleteUseCase {
  constructor(private repository: any) {
    //
  }

  async execute(uuid: string): Promise<IApiDataOut> {
    await this.repository.delete(uuid);
    return apiPattern({ id: uuid });
  }
}
export { DefaultDeleteUseCase };
