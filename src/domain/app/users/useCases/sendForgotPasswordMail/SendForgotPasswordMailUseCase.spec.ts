import { UserRepositoryInMemory } from '@modules/accounts/repositories/In-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/In-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await userRepositoryInMemory.create({
      driver_license: '664168',
      email: 'avzonbop@ospo.pr',
      name: 'Blanche Curry',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('avzonbop@ospo.pr');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ka@uj.gr')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    userRepositoryInMemory.create({
      driver_license: '787330',
      email: 'abome@regrog.ee',
      name: 'Leon Perkins',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('abome@regrog.ee');

    expect(generateTokenMail).toBeCalled();
  });
});
