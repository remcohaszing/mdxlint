/**
 * @import { Config } from 'mdxlint'
 */

import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

/**
 * A type-safe way to define a mdxlint configuration.
 *
 * @param {Config} config
 *   The configuration.
 * @returns {Config}
 *   The configuration.
 */
export function defineConfig(config) {
  return config
}

/**
 * A unified processor which can process MDX content.
 */
export const mdxlint = unified().use(remarkParse).use(remarkStringify).use(remarkMdx).freeze()
