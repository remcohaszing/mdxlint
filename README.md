# mdxlint

[![github actions](https://github.com/remcohaszing/mdxlint/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/mdxlint/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/mdxlint/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/mdxlint)
[![npm version](https://img.shields.io/npm/v/mdxlint)](https://www.npmjs.com/package/mdxlint)
[![npm downloads](https://img.shields.io/npm/dm/mdxlint)](https://www.npmjs.com/package/mdxlint)

<img alt="" src="./logo.svg">

A CLI to lint and format [MDX](https://mdxjs.com) content.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration file](#configuration-file)
  - [Plugins](#plugins)
  - [Settings](#settings)
- [API](#api)
  - [`defineConfig(config)`](#defineconfigconfig)
  - [`mdxlint`](#mdxlint-1)
- [Examples](#examples)
  - [Syntax extensions](#syntax-extensions)
  - [Linting](#linting)
  - [Spell checking](#spell-checking)
  - [Consistent formatting](#consistent-formatting)
- [Prettier](#prettier)
- [Compatibility](#compatibility)
- [Related projects](#related-projects)
- [Sponsoring](#sponsoring)
- [License](#license)

## Installation

```sh
npm install mdxlint
```

## Usage

Check all `.mdx` files for lint violations:

```sh
mdxlint . --frail
```

Transform and format all `.mdx` files:

```sh
mdxlint . --output
```

For more options, see:

```sh
mdxlint --help
```

## Configuration file

The mdxlint CLI loads one the following configuration files:

- The `mdxlint` key in `package.json`
- `.mdxlintrc`
- `.mdxlintrc.json`
- `.mdxlintrc.js`
- `.mdxlintrc.cjs`
- `.mdxlintrc.mjs`
- `.mdxlintrc.yml`
- `.mdxlintrc.yaml`

Ignore patterns can be specified in `.mdxlintignore`.

### Plugins

The `plugins` property specifies which plugins or presets to load. All
[remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) and
[remark-lint rules](https://github.com/remarkjs/remark-lint#rules) are supported.

### Settings

The `settings` property specifies how content is formatted. It accepts the same fields as the
[options](https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#options) from
`remark-stringify`.

## API

### `defineConfig(config)`

A type-safe way to define a mdxlint configuration.

#### Arguments

- `config` (`Config`) — The configuration.

#### Returns

The configuration.

### `mdxlint`

A unified [processor](https://github.com/unifiedjs/unified#processor) which can process MDX content.

## Examples

### Syntax extensions

The following `.mdxlintrc.json` file adds support for [GFM](https://github.com/remarkjs/remark-gfm)
and [frontmatter](https://github.com/remarkjs/remark-frontmatter) with TOML and YAML syntax.

```json
{
  "plugins": ["remark-gfm", ["remark-frontmatter", ["toml", "yaml"]]]
}
```

### Linting

The following `.mdxlintrc.js` file reports errors if link definitions or JSX attributes are not
sorted.

```js
import { defineConfig } from 'mdxlint'

export default defineConfig({
  plugins: ['remark-lint-definition-sort', 'remark-lint-mdx-jsx-attribute-sort']
})
```

### Spell checking

The following `.mdxlintrc.mjs` file does spell checking based on
[retext plugins](https://github.com/retextjs/retext/blob/main/doc/plugins.md).

```js
/**
 * @import { Config } from 'mdxlint'
 */

import dictionary from 'dictionary-en'
import remarkRetext from 'remark-retext'
import retextEnglish from 'retext-english'
import retextSpell from 'retext-spell'
import retextSyntaxURLs from 'retext-syntax-urls'
import { unified } from 'unified'

/** @type {Config} */
export default {
  plugins: [
    [
      remarkRetext,
      unified().use(retextEnglish).use(retextSyntaxURLs).use(retextSpell, { dictionary })
    ]
  ]
}
```

### Consistent formatting

The following `.mdxlintrc.yaml` file ensures the file is always formatted, where a hyphen (`-`) is
used for bullet lists. It also makes sure the table of contents is always up-to-date.

```yaml
settings:
  bullet: '-'
plugins:
  - remark-toc
  - unified-consistency
```

## Prettier

Unfortunately Prettier doesn’t support MDX 3. If you use Prettier, add the following to your
`.prettierignore`:

```ignore
*.mdx
```

## Compatibility

This project is compatible with Node.js 20 or greater.

## Related projects

- [`remark-cli`](https://github.com/remarkjs/remark/tree/main/packages/remark-cli) can lint and
  format markdown content.
- [`eslint-plugin-mdx`](https://github.com/mdx-js/eslint-mdx) can check MDX files using ESLint. It
  can also apply remark rules via the [`mdx/remark`](https://github.com/mdx-js/eslint-mdx#mdxremark)
  rule.
- [`mdxlint-language-server`](https://github.com/remcohaszing/mdxlint-language-server) provides a
  language server for mdxlint.
- [`vscode-mdxlint`](https://github.com/remcohaszing/vscode-mdxlint) provides a
  [Visual Studio Code](https://code.visualstudio.com/) extension for mdxlint.

## Sponsoring

If you like this project, consider sponsoring me via
[GitHub Sponsors](https://github.com/sponsors/remcohaszing).

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
