import type { Root } from 'mdast'
import type { Options } from 'remark-stringify'
import type { Plugin, PluginTuple, Preset, Processor } from 'unified'

type PluggableMap = Record<string, unknown>
type PluggableSupportingSpecifiers =
  | [plugin: string, ...parameters: unknown[]]
  | Plugin<any[], Root, Root>
  | PluginTuple<any[], Root, Root>
  | Preset
  | string

export interface Config {
  /**
   * Formatting options.
   */
  settings?: Options | undefined

  /**
   * A list of plugins
   */
  plugins?: PluggableMap | PluggableSupportingSpecifiers[] | undefined
}

/**
 * A type-safe way to define a mdxlint configuration.
 *
 * @param config
 *   The configuration.
 * @returns
 *   The configuration.
 */
export function defineConfig(config: Config): Config

/**
 * A unified processor which can process MDX content.
 */
export const mdxlint: Processor<Root, undefined, undefined, Root, string>
