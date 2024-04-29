import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  all: publicProcedure
    .query(() => {
      return {
        greeting: `hello world!`,
      };
    }),
});
