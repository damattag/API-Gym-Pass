import { NearbyGymQueryInput } from "@/DTOs/Gym";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

import { FastifyRequest, FastifyReply } from "fastify";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = request.query as NearbyGymQueryInput;

  const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase();

  const {gyms} = await fetchNearbyGymUseCase.execute({ userLatitude: latitude, userLongitude: longitude });
  

  return reply.status(201).send({
    gyms
  });
}
