import { Data } from '../parser.js'
import { attributeToCamelCase, propertyToCamelCase } from './_case.js'
import { renderPropsInterface,renderTag } from './_common.js'

function renderProps(data: Data): string {
  return [
    'const {',
    [
      ...Object.keys(data.attributes).map(attributeToCamelCase),
      ...Array.from(data.booleanAttributes).map(attributeToCamelCase),
      ...Array.from(data.properties).map(propertyToCamelCase),
      '...props',
    ].join(', '),
    '} = Astro.props',
  ].join(' ')
}

// https://docs.astro.build/en/guides/typescript/
export function render(filename: string, data: Data): string {
  return `---
// Generated by MistCSS, do not modify
import type { HTMLAttributes } from 'astro/types'
import './${filename}.mist.css'

${renderPropsInterface(data, `HTMLAttributes<'${data.tag}'>`)}

${renderProps(data)}
---

${renderTag(data, '<slot />', 'class', 'object')}
`
}
