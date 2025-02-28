import { Source, Sink } from './types';
declare function pipe<T = any, R = any>(this: Source<T>, sink: Sink<R>): Sink<R>;
export default pipe;
