import { HelperOptions } from 'handlebars';

export function ifEqual (
  this: unknown,
  v1: unknown,
  v2: unknown,
  options: HelperOptions,
) {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
};
