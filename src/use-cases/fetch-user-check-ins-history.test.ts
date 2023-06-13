import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check-In History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-id1",
    });

    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-id2",
    });

    const { checkIns } = await sut.execute({
      userId: "user-id",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-id1",
      }),
      expect.objectContaining({
        gym_id: "gym-id2",
      }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: "user-id",
        gym_id: `gym-id${i}`,
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-id",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-id21",
      }),
      expect.objectContaining({
        gym_id: "gym-id22",
      }),
    ]);
  });
});
