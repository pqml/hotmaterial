import { el } from '@internet/dom'

export default function createError (props) {
  return el('li', {
    textContent: props.code + ': ' + props.msg,
    css: {
      listStyle: 'inside',
      padding: '0',
      color: '#999',
      fontSize: '14px',
      lineHeight: '1.5em'
    }
  })
}
