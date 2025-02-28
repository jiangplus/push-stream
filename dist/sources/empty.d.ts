import Pipeable from '../pipeable';
declare class EmptyStream<T = any> extends Pipeable<T> {
    constructor();
    resume(): void;
}
export default function empty<T = any>(): EmptyStream<T>;
export {};
