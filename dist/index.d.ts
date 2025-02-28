import { Source, Sink } from './types';
declare function push<T = any>(source: Source<T>, ...args: Sink<any>[]): Source<any>;
export = push;
