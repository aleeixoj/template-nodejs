import { prisma } from 'database/prismaClient';

import { IUserTokenDTO } from '@domain/app/auth/interfaces';
import { userTokens } from '@prisma/client';

import { IUsersTokensRepository } from '../interfaces';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: any;
  constructor() {
    this.repository = prisma.userTokens;
  }

  async create({
    expires_date,
    refresh_token,
    uuid_user,
  }: IUserTokenDTO): Promise<userTokens> {
    const userToken = this.repository.create({
      data: {
        expires_date,
        refresh_token,
        uuid_user,
      },
    });

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<userTokens> {
    const userTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<userTokens> {
    const userToken = await this.repository.findOne({ refresh_token });
    return userToken;
  }
}

export { UsersTokensRepository };
