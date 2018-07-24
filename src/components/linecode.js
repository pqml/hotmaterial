import { el } from '@internet/dom'

export default function linecode (line, code) {
  return el('p', {
    textContent: line + ': ' + code,
    css: {
      listStyle: 'none',
      padding: '0'
    }
  })
}