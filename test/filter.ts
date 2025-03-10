import * as test from 'tape';
import push from '../';

test('filter - basics', (t) => {
  push(
    push.values([1, 2, 3, 4, 5, 6]),
    push.filter((n) => n % 2 === 1),
    push.collect((err, arr) => {
      t.error(err, 'no error');
      t.deepEqual(arr, [1, 3, 5], 'filtered');
      t.end();
    })
  );
});
