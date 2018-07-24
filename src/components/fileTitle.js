import { el } from '@internet/dom'

export default function fileTitle (props) {
  return el('div', { textContent: props.id, css: {
    color: 'gray'
  }})
}