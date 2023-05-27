import { CreateUserInput } from "@/DTOs/User";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = request.body as CreateUserInput;

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    return reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });

  return reply.status(201).send("Usuário criado com sucesso!");
}
