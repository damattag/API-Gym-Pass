import { z } from "zod";

const CreateGym = z.object({
  name: z
    .string()
    .nonempty({ message: "O nome não pode ser vazio." }),
  description: z
    .string()
    .nullable(),
  phone: z
    .string()
    .nullable(),
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

const UpdateGym = z.object({
  name: z
    .string()
    .optional(),
  description: z
    .string()
    .nullable()
    .optional(),
  phone: z
    .string()
    .nullable()
    .optional(),
  latitude: z
    .number()
    .refine(value => {
      return Math.abs(value) <= 90;
    }
  )
    .optional(),
  longitude: z
    .number()
    .refine(value => {
      return Math.abs(value) <= 180;
    }
  )
    .optional(),  
});

const SearchGymQuery = z.object({
  query: z
    .string(),
  page: z
    .coerce
    .number()
    .min(1)
    .default(1),
});

const NearbyGymQuery = z.object({
  latitude: z
    .number()
    .refine(value => {
      return Math.abs(value) <= 90;
    }
    ),
  longitude: z
    .number()
    .refine(value => {
      return Math.abs(value) <= 180;
    }
    )
});

  
export type CreateGymInput = z.infer<typeof CreateGym>;
export type UpdateGymInput = z.infer<typeof UpdateGym>;
export type SearchGymQueryInput = z.infer<typeof SearchGymQuery>;
export type NearbyGymQueryInput = z.infer<typeof NearbyGymQuery>;
