import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "../check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime";
import { MaxNumberOfCheckInsError } from "../error/max-number-of-check-ins-error";
import { MaxDistanceError } from "../error/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check Ins Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-id",
      name: "Gym Name",
      description: "Gym Description",
      phone: "123456789",
      latitude: -8.0413385,
      longitude: -34.8973593,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -8.0413385,
      userLongitude: -34.8973593,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -8.0413385,
      userLongitude: -34.8973593,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-id",
        userId: "user-id",
        userLatitude: -8.0413385,
        userLongitude: -34.8973593,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -8.0413385,
      userLongitude: -34.8973593,
    });

    vi.setSystemTime(new Date("2021-01-02 10:00:00"));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: -8.0413385,
      userLongitude: -34.8973593,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-id2",
      name: "Gym Name",
      description: "Gym Description",
      phone: "123456789",
      latitude: new Decimal(-7.9929492),
      longitude: new Decimal(-34.8494404),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-id2",
        userId: "user-id",
        userLatitude: -8.0413385,
        userLongitude: -34.8973593,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
