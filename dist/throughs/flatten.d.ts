import { ThroughStream } from './through';
declare class FlattenStream<T = any> extends ThroughStream<T[]> {
    queue: T[];
    source: any;
    sink?: any;
    constructor();
    write(data: T[]): void;
    resume(): void;
    abort(err?: Error | boolean): void;
    end(err?: Error | boolean | null): void;
}
export default function flatten<T = any>(): FlattenStream<T>;
export {};
