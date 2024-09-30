import { Data } from '../parser.js'
import { attributeToCamelCase, propertyToCamelCase } from './_case.js'
import { renderPropsInterface, renderTag } from './_common.js'

function renderProps(data: Data): string {
  return [
    'const {',
    [
      ...Object.keys(data.attributes).map(attributeToCamelCase),
      ...Array.from(data.booleanAttributes).map(attributeToCamelCase),
      ...Array.from(data.properties).map(propertyToCamelCase),
      '...props',
    ].join(', '),
    '} = $$props',
  ].join(' ')
}

export function render(filename: string, data: Data): string {
  return `<script lang="ts">
// Generated by MistCSS, do not modify
import type { SvelteHTMLElements } from 'svelte/elements'
import './${filename}.mist.css'

${renderPropsInterface(data, `SvelteHTMLElements['${data.tag}']`)}

type $$Props = Props

${renderProps(data)}
</script>

${renderTag(data, '<slot />', 'class', 'svelte')}
`
}
