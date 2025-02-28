import Pipeable from '../pipeable';
declare class ValueStream<T = any> extends Pipeable<T> {
    _i: number;
    _values: T[];
    constructor(values: T[]);
    resume(): void;
    abort(err?: Error | boolean): void;
}
export default function values<T = any>(values: T[]): ValueStream<T>;
export {};
