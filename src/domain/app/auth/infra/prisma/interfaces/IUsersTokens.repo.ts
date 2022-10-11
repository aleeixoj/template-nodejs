import { IUserTokenDTO } from '@domain/app/auth/interfaces';
import { userTokens } from '@prisma/client';

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenDTO): Promise<userTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<userTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<userTokens>;
}

export { IUsersTokensRepository };
