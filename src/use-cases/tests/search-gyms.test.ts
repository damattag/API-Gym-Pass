import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      name: "Gym 1",
      description: null,
      phone: null,
      latitude: -8.0413385,
      longitude: -34.8973593,
    });

    await gymsRepository.create({
      name: "Gym 2",
      description: null,
      phone: null,
      latitude: -8.0413385,
      longitude: -34.8973593,
    });

    const { gyms } = await sut.execute({
      query: "Gym 1",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        name: "Gym 1",
      }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -8.0413385,
        longitude: -34.8973593,
      });
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Gym 21" }),
      expect.objectContaining({ name: "Gym 22" }),
    ]);
  });
});
