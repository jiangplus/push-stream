import Pipeable from '../pipeable';
declare class InfiniteStream extends Pipeable<number> {
    _i: number;
    _looping: boolean;
    constructor();
    resume(): void;
    abort(err?: Error | boolean): void;
}
export default function infinite(): InfiniteStream;
export {};
