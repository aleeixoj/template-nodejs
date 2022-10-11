import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendFogotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendFogotPasswordMailUseCase.execute(email);

    return response.status(200).send();
  }
}
export { SendForgotPasswordMailController };
