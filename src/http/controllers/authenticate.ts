import { AuthenticateUserInput } from "@/DTOs/User";
import { InvalidCredentialsError } from "@/use-cases/error/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = request.body as AuthenticateUserInput;

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}
