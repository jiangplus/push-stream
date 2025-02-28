import * as test from 'tape';
import push from '../';

test('drain - accepts null 1st arg', (t) => {
  push(
    push.values([1, 2, 3]),
    push.drain(null, (err) => {
      t.end();
    })
  );
});
