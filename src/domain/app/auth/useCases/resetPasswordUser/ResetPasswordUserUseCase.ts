import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@domain/app/users/infra/prisma/interfaces';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

import { IUsersTokensRepository } from '../../infra/prisma/interfaces';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {
    //
  }
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Invalid Token!');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError('Token expired!');
    }

    const user = await this.userRepository.findById(userToken.uuid_user);

    user[0].password = await hash(password, 8);

    await this.userRepository.update(user[0].uuid, user[0], {});

    await this.usersTokensRepository.deleteById(userToken.uuid_user);
  }
}
export { ResetPasswordUserUseCase };
