/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'tsyringe';

@injectable()
class FindAllPatternBlockMapper {
  constructor() {
    //
  }

  async execute(data: any) {
    return data;
  }
}

export { FindAllPatternBlockMapper };
