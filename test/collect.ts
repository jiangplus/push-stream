import * as test from 'tape';
import push from '../';

test('collect - empty', (t) => {
  push(
    push.empty(),
    push.collect((err, ary) => {
      t.notOk(err);
      t.deepEqual(ary, []);
      t.end();
    })
  );
});
