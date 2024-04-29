import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    retypePassword: z.string(),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  });

export const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" })
  });