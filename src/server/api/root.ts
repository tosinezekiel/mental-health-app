import { postRouter } from "~/server/api/routers/post";
import { preliminaryRouter } from "~/server/api/routers/preliminary";
import { consultationRouter } from "~/server/api/routers/consultation";
import { categoryRouter } from "~/server/api/routers/category";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  preliminary: preliminaryRouter,
  consultation: consultationRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
