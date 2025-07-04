import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'
import { stripVTControlCharacters } from 'node:util'

test('ok', () => {
  const { status, stderr } = spawnSync('mdxlint', ['examples/ok.mdx', '--frail'])
  assert.equal(status, 0)
  assert.equal(stripVTControlCharacters(String(stderr)), 'examples/ok.mdx: no issues found\n')
})

test('lint error', () => {
  const { status, stderr } = spawnSync('mdxlint', ['examples/lint-error.mdx', '--frail'])
  assert.equal(status, 1)
  assert.equal(
    stripVTControlCharacters(String(stderr)),
    'examples/lint-error.mdx\n' +
      '3:1-3:25 warning Replace `[unknown·link·reference]` with `\\[unknown·link·reference]\\` replace unified-consistency\n' +
      '\n' +
      '⚠ 1 warning\n'
  )
})

test('syntax error', () => {
  const { status, stderr } = spawnSync('mdxlint', ['examples/syntax-error.mdx', '--frail'])
  assert.equal(status, 1)
  assert.equal(
    stripVTControlCharacters(String(stderr)),
    'examples/syntax-error.mdx\n' +
      '        error Cannot process file\n' +
      '  [cause]:\n' +
      '    2:1 info  Unexpected end of file in expression, expected a corresponding closing brace for `{` unexpected-eof micromark-extension-mdx-expression\n' +
      '\n' +
      '✖ 1 error\n'
  )
})
