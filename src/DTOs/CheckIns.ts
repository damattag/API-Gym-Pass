import { z } from "zod";

const CreateCheckIn = z.object({
  latitude: z
    .number()
    .refine(value => {
      return Math.abs(value) <= 90;
    }),
  longitude: z
    .number()
    .refine(value => {
      return Math.abs(value) <= 180;
    }),
});

const CreateCheckInParams = z.object({
  gymId: z
    .string()
    .uuid(),
});

const CheckInHistoryQuery = z.object({
  page: z
    .coerce
    .number()
    .min(1)
    .default(1),
});

const ValidateCheckInParams = z.object({
  checkInId: z
    .string()
    .uuid(),
});

  
export type CreateCheckInInput = z.infer<typeof CreateCheckIn>;
export type CreateCheckInParamsInput = z.infer<typeof CreateCheckInParams>;
export type CheckInHistoryQueryInput = z.infer<typeof CheckInHistoryQuery>;
export type ValidateCheckInParamsInput = z.infer<typeof ValidateCheckInParams>;
