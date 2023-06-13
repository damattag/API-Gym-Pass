import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-id1",
    });

    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-id2",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-id",
    });

    expect(checkInsCount).toEqual(2);
  });
});
