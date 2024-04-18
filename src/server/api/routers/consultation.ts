import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const consultationRouter = createTRPCRouter({
  generateReport: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      // This endpoint is used to generate report
      return {
        greeting: `Hello ${input.text}`,
      };
    }),


});
