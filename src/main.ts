import * as BunContext from '@effect/platform-bun/BunContext';
import * as BunRuntime from '@effect/platform-bun/BunRuntime';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { BarService } from './bar';
import { FooService } from './foo';
import { program } from './program';

// TODO: config service from env file
console.log({ foo: Bun.env.FOO });

const MainLayer = Layer.mergeAll(
  BunContext.layer,
  BarService.Default,
  FooService.Live,
);
BunRuntime.runMain(
  program.pipe(Effect.tap(Effect.log), Effect.provide(MainLayer)),
);
