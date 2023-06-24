import { CreateGymInput } from "@/DTOs/Gym";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, latitude, longitude, phone } = request.body as CreateGymInput;

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({ name, description, latitude, longitude, phone });
  

  return reply.status(201).send("Academia criada com sucesso!");
}
