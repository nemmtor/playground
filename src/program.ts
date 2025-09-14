import * as Effect from 'effect/Effect';
import { BarService } from './bar';
import { FooService } from './foo';

export const program = Effect.gen(function* () {
  const fooService = yield* FooService;
  const barService = yield* BarService;

  const foo = fooService.getFoo();
  const bar = barService.getBar();

  return { foo, bar };
});
