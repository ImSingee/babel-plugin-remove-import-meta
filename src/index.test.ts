import * as babelCore from '@babel/core';
import dedent from 'ts-dedent';
import importMetaPlugin from './index';

const unknownKeysSpec = () => {
  test('does not transform non-meta property', () => {
    const input = dedent(`
      console.log(foo.import.meta);
    `);

    const expected = dedent(`
      console.log(foo.import.meta);
    `);
    const result = babelCore.transform(input, {
      plugins: [importMetaPlugin]
    })?.code ?? '';
    expect(result.trim()).toEqual(expected.trim());
  });

  test('does not remove import.meta if known property is not specified', () => {
    const input = dedent(`
      console.log(import.meta);
    `);

    const expected = dedent(`
      console.log(import.meta);
    `);
    const result = babelCore.transform(input, {
      plugins: [importMetaPlugin]
    })?.code ?? '';
    expect(result.trim()).toEqual(expected.trim());
  });

  test('does not remove unknown meta properties', () => {
    const input = dedent(`
      console.log(import.meta.foo);
    `);

    const expected = dedent(`
      console.log(import.meta.foo);
    `);
    const result = babelCore.transform(input, {
      plugins: [importMetaPlugin]
    })?.code ?? '';
    expect(result.trim()).toEqual(expected.trim());
  });
};

describe('babel-plugin-remove-import-meta', () => {
  test('transforms import.meta.url', () => {
    const input = dedent(`
        console.log(import.meta.url);
      `);

    const expected = dedent(`
        console.log("");
      `);
    const result = babelCore.transform(input, {
      plugins: [importMetaPlugin]
    })?.code ?? '';
    expect(result.trim()).toEqual(expected.trim());
  });

  unknownKeysSpec();
});
