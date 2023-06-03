import { CreateUserInput } from "@/DTOs/User";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/register";

import { FastifyRequest, FastifyReply } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = request.body as CreateUserInput;

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send("Usuário criado com sucesso!");
}
