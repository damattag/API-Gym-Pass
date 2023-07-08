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

  
export type CreateCheckInInput = z.infer<typeof CreateCheckIn>;
export type CreateCheckInParamsInput = z.infer<typeof CreateCheckInParams>;
