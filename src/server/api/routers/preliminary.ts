import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const preliminaryRouter = createTRPCRouter({
  all: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      // This fetches preliminary questions
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

});
