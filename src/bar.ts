import * as Effect from 'effect/Effect';

export class BarService extends Effect.Service<BarService>()('BarService', {
  succeed: {
    getBar: () => 'bar',
    getBarEffect: () => Effect.succeed('bar'),
  },
}) {}
