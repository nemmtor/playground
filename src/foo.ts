import * as Context from 'effect/Context';
import * as Layer from 'effect/Layer';

interface FooServiceShape {
  getFoo: () => string;
}

export class FooService extends Context.Tag('@app/FooService')<
  FooService,
  FooServiceShape
>() {
  static Live = Layer.succeed(
    FooService,
    FooService.of({ getFoo: () => 'foo' }),
  );
}
