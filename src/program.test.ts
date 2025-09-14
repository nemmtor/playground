import { describe, expect, it, mock } from 'bun:test';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { BarService } from './bar';
import { FooService } from './foo';
import { program } from './program';

describe('program', () => {
  it('returns foo and bar', async () => {
    const result = program.pipe(
      Effect.provide(Layer.merge(BarService.Default, FooService.Live)),
      Effect.runSync,
    );

    expect(result).toEqual(expect.objectContaining({ foo: 'foo', bar: 'bar' }));
  });

  it('calls foo', () => {
    const fooMock = mock();
    program.pipe(
      Effect.provide(
        Layer.merge(
          BarService.Default,
          Layer.succeed(FooService, FooService.of({ getFoo: fooMock })),
        ),
      ),
      Effect.runSync,
    );

    expect(fooMock).toHaveBeenCalled();
  });

  it('calls bar', () => {
    const barMock = mock();
    program.pipe(
      Effect.provide(
        Layer.merge(
          Layer.mock(BarService, { _tag: 'BarService', getBar: barMock }),
          FooService.Live,
        ),
      ),
      Effect.runSync,
    );

    expect(barMock).toHaveBeenCalled();
  });
});
