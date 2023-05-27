import { z } from "zod";

export const CreateUser = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "O nome deve conter apenas letras." })
    .nonempty({ message: "O nome não pode ser vazio." }),
  email: z.string().email({ message: "Endereço de email inválido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export const UpdateUser = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "O nome deve conter apenas letras." })
    .optional(),
  email: z
    .string()
    .email({ message: "Endereço de email inválido." })
    .optional(),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
    .optional(),
});

export type CreateUserInput = z.infer<typeof CreateUser>;
