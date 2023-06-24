import { CreateCheckInInput, CreateCheckInParamsInput } from "@/DTOs/CheckIns";
import { makeCheckInsUseCase } from "@/use-cases/factories/make-check-in-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = request.body as CreateCheckInInput;

  const { gymId } = request.params as CreateCheckInParamsInput;

  const createCheckinUseCase = makeCheckInsUseCase();

  await createCheckinUseCase.execute({ 
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
   });
  

  return reply.status(201).send("Check-in criado com sucesso!");
}
