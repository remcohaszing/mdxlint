#!/usr/bin/env node
import { args } from 'unified-args'

import pkg from '../package.json' with { type: 'json' }
import { mdxlint } from './mdxlint.js'

args({
  description: pkg.description,
  extensions: ['mdx'],
  ignoreName: `.${pkg.name}ignore`,
  name: pkg.name,
  packageField: pkg.name,
  pluginPrefix: 'remark',
  processor: mdxlint,
  rcName: `.${pkg.name}rc`,
  version: `${pkg.name} ${pkg.version}`
})
