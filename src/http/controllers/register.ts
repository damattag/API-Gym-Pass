import { CreateUserInput } from "@/DTOs/User";
import { UserAlreadyExistsError } from "@/use-cases/error/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = request.body as CreateUserInput;

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send("Usuário criado com sucesso!");
}
