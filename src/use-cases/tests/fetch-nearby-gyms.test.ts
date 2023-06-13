import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      name: "Near Gym",
      description: null,
      phone: null,
      latitude: -8.0413385,
      longitude: -34.8973593,
    });

    await gymsRepository.create({
      name: "Far Gym",
      description: null,
      phone: null,
      latitude: -9.0413385,
      longitude: -33.8973593,
    });

    const { gyms } = await sut.execute({
      userLatitude: -8.0413385,
      userLongitude: -34.8973593,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Near Gym" })]);
  });
});
