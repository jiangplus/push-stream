import * as test from 'tape';
import push from '../';

test('take - with through and collect', (t) => {
  t.plan(3);
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  push(
    push.values(values),
    push.take(10),
    push.through(null, (err) => {
      t.ok(true);
      process.nextTick(() => {
        t.end();
      });
    }),
    push.collect((err, ary) => {
      t.deepEquals(ary, values);
      t.ok(true);
    })
  );
});

test('take - exclude last (default)', (t) => {
  push(
    push.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    push.take((n) => n < 5),
    push.collect((err, four) => {
      t.deepEqual(four, [1, 2, 3, 4]);
      t.end();
    })
  );
});

test('take - include last', (t) => {
  push(
    push.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    push.take((n) => n < 5, { last: true }),
    push.collect((err, five) => {
      t.deepEqual(five, [1, 2, 3, 4, 5]);
      t.end();
    })
  );
});

test('take - take 5 causes 5 reads upstream', (t) => {
  let reads = 0;
  push(
    push.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    push.through(() => {
      reads++;
    }),
    push.take(5),
    push.collect((err, five) => {
      t.deepEqual(five, [1, 2, 3, 4, 5]);
      process.nextTick(() => {
        t.equal(reads, 5);
        t.end();
      });
    })
  );
});

test('take - should throw error on last read', (t) => {
  let i = 0;
  const error = new Error('error on last call');

  push(
    push.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    push.take((n) => n < 5, { last: true }),
    push.asyncMap((data, cb) => {
      setTimeout(() => {
        if (++i < 5) cb(null, data);
        else cb(error);
      }, 100);
    }),
    push.collect((err, five) => {
      t.equal(err, error, 'should return err');
      t.deepEqual(five, [1, 2, 3, 4], 'should skip failed item');
      t.end();
    })
  );
});
