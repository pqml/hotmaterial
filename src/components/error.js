import { el } from '@internet/dom'

export default function createError (props) {
  return el('li', {
    textContent: props.code + ': ' + props.msg,
    css: {
      listStyle: 'none',
      padding: '0'
    }
  })
}
