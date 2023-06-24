import { CreateGymInput, SearchGymQueryInput } from "@/DTOs/Gym";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { query, page } = request.query as SearchGymQueryInput;

  const searchGymUseCase = makeSearchGymsUseCase();

  const {gyms} = await searchGymUseCase.execute({ query, page });
  
  return reply.status(200).send({
    gyms
  });
}
