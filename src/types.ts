export interface Sink<T = any> {
  paused: boolean;
  ended?: boolean | Error;
  source?: any; // Using any to avoid circular reference issues
  write(data: T): void;
  end(err?: Error | boolean | null): void;
  abort?(err?: Error | boolean): void;
}

export interface Source<T = any> {
  sink?: any; // Using any to avoid circular reference issues
  paused?: boolean;
  ended?: boolean | Error;
  resume(): void;
  abort(err?: Error | boolean): void;
  pipe<R = any>(sink: Sink<R>): Sink<R>;
}

export type Callback<T = any> = (err: Error | null, result?: T) => void;
