/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

import { AppError } from '@shared/errors/AppError';

class CpfUtil {
  static async cpfValidate(data: any, repository: any, param: any, column: any) {
    const cpfValid = cpfValidator.isValid(data[column]);
    if (!cpfValid) {
      throw new AppError('CPF Inválido', 500, new Error());
    }
    const consulta = await repository.findAll({
      parameter: param,
    });

    if (consulta[column]) {

      data[column] = consulta[column];
    }
    return data;
  }
  static async cnpjValidate(data: any, repository: any, param: any, column: any) {
    const cnpjValid = cnpjValidator.isValid(data[column]);
    if (!cnpjValid) {
      throw new AppError('CNPJ Inválido', 500, new Error());
    }

    const consulta = await repository.findAll({
      parameter: param,
    });

    if (consulta[column]) {
      data[column] = consulta[column];
    }

    return data;
  }
}

export { CpfUtil };
