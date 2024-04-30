import { z } from "zod";
import { db } from "~/server/db";
import { registerFormSchema } from "~/app/schemas/formSchema";
import bcrypt from 'bcryptjs';

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
  .input(
    registerFormSchema
  ).mutation(async (opts) => {
    const { input } = opts;
    const { firstName, lastName, email, password } = input;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    });
    
    return user;
  }),
});
