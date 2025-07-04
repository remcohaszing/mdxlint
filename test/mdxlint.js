import assert from 'node:assert/strict'
import { test } from 'node:test'

import { defineConfig, mdxlint } from 'mdxlint'

test('defineConfig', () => {
  const config = defineConfig({
    settings: {},
    plugins: []
  })

  assert.deepEqual(config, {
    settings: {},
    plugins: []
  })
})

test('mdxlint', () => {
  const formatted = mdxlint.processSync(`
- A
- list

{/**
  * A comment
  */}

<div  />
`)

  assert.equal(
    String(formatted),
    `* A
* list

{/**
  * A comment
  */}

<div />
`
  )
})
