import * as bench from 'micro-bmark';
import * as pull from 'pull-stream';
import push from '../';

bench.run(async () => {
  const ARRAY = Array(200_000).fill(0).map((_, i) => i);

  await bench.mark(
    'pull.values',
    1000,
    () =>
      new Promise<void>((resolve) =>
        pull(pull.values(ARRAY), pull.drain(null, resolve))
      )
  );
  await bench.mark(
    'push.values',
    1000,
    () =>
      new Promise<void>((resolve) =>
        push(push.values(ARRAY), push.drain(null, resolve))
      )
  );

  await bench.mark(
    'pull.asyncMap',
    1000,
    () =>
      new Promise<void>((resolve) =>
        pull(
          pull.values(ARRAY),
          pull.asyncMap((x: number, cb: any) => cb(null, x)),
          pull.drain(null, resolve)
        )
      )
  );
  await bench.mark(
    'push.asyncMap',
    1000,
    () =>
      new Promise<void>((resolve) =>
        push(
          push.values(ARRAY),
          push.asyncMap((x: number, cb: any) => cb(null, x)),
          push.drain(null, resolve)
        )
      )
  );

  await bench.mark(
    'pull.filter',
    1000,
    () =>
      new Promise<void>((resolve) =>
        pull(
          pull.values(ARRAY),
          pull.filter((x: number) => x % 2 === 0),
          pull.drain(null, resolve)
        )
      )
  );
  await bench.mark(
    'push.filter',
    1000,
    () =>
      new Promise<void>((resolve) =>
        push(
          push.values(ARRAY),
          push.filter((x: number) => x % 2 === 0),
          push.drain(null, resolve)
        )
      )
  );
});
