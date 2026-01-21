import type { RouterClient } from "@orpc/server";

import { publicProcedure } from "../index";
import { stagesRouter } from "./stages";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	stages: stagesRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
