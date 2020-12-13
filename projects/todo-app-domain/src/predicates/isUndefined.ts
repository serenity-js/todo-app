import { Predicate } from 'tiny-types';

export function isUndefined<T>(): Predicate<T> {
    return Predicate.to(`be undefined`, (value: T) =>
        value === undefined,
    );
}
