import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../../repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      name: "Academia",
      description: null,
      phone: null,
      latitude: -8.0413385,
      longitude: -34.8973593,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});