import { initTRPC } from '@trpc/server';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

const createContext = async ({ req, res }: CreateHTTPContextOptions) => {
  return {
    foo: 'foo',
    bar: 'bar',
  };
};

const t = initTRPC.context<typeof createContext>().create();

const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
  setColor: publicProcedure
    .input((val) => {
      if (val === 'orange') return 'orange' as const;
      if (val === 'purple') return 'purple' as const;
      throw new Error('invalid color');
    })
    .query(async ({ ctx, input }) => {
      console.log('trpc', { input });
      return Promise.resolve('orange');
    }),
});

export type AppRouter = typeof appRouter;
