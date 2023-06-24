import { CheckInHistoryQueryInput } from "@/DTOs/CheckIns";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const { page } = request.query as CheckInHistoryQueryInput;

  const checkInhistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await checkInhistoryUseCase.execute({
    userId: request.user.sub,
    page
  });
  
  return reply.status(201).send({
    checkIns
  });
}
