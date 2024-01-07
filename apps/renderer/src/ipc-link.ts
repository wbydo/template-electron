import {
  OperationResultEnvelope,
  TRPCClientError,
  TRPCLink,
  createTRPCProxyClient,
} from '@trpc/client';
import { observable } from '@trpc/server/observable';
import type { AppRouter } from '@~/trpc';

export const ipcLink = (): TRPCLink<AppRouter> => {
  return (runtime) => {
    return ({ op, next }) => {
      return observable((observer) => {
        const rawInput = op.input;
        const serializedInput = runtime.transformer.serialize(rawInput);
        console.log('ipcLink: input', { rawInput, serializedInput, op });

        // 参考
        // https://github.com/wbydo/fuusen/pull/65/files#diff-8eecd34c3f4dffef5c194c916be7c8c414dc8947b5c7ee671ff3cf078f317aa2R25
        window.APP_API_KEY.APP_API_PROPERTY_NAME(op)
          .then((data) => {
            console.log('ipcLink: execute', { data });
            const envelope: OperationResultEnvelope<unknown> = {
              result: {
                data,
              },
              context: undefined, // 何かあれば使える
            };
            observer.next(envelope);
            observer.complete();
          })
          .catch((err) => {
            console.error(err);
            observer.error(
              new TRPCClientError('check the console.', { cause: err })
            );
          });

        return () => {};
      });
    };
  };
};

const client = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
});
