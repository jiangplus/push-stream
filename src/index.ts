import * as sources from './sources';
import * as sinks from './sinks';
import * as throughs from './throughs';
import { Source, Sink } from './types';

function push<T = any>(source: Source<T>, ...args: Sink<any>[]): Source<any> {
  let result: any = source;
  for (let i = 0; i < args.length; i++) {
    result = result.pipe(args[i]);
  }
  return result;
}

// Add all the methods to the push function
Object.assign(push, sources, sinks, throughs);

export = push;
