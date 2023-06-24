import { CreateCheckInInput, CreateCheckInParamsInput, ValidateCheckInParamsInput } from "@/DTOs/CheckIns";
import { makeCheckInsUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const { checkInId } = request.params as ValidateCheckInParamsInput;

  const validateCheckinUseCase = makeValidateCheckInUseCase();

  await validateCheckinUseCase.execute({ 
    checkInId,
   });
  

  return reply.status(204).send("Check-in validado com sucesso!");
}
