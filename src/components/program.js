import { el } from '@internet/dom'

import fileTitle from './fileTitle'

export default function program (props) {
  var $ = el('div', { css: {
    paddingBottom: '20px',
    marginBottom: '40px'
  }})

  var $ul = el('ul', { css: {
    listStyle: 'none',
    padding: '0 0 0 0',
    margin: '5px 0'
  }})

  var $error = el('li', {
    textContent: props.error,
    css: {
      listStyle: 'inside',
      padding: '10px 0',
      color: '#fc5759',
      fontSize: '14px',
      lineHeight: '1.5em'
    }
  })

  var $subtitle = el('span', {
    textContent: ' (' + props.vertId + ' with ' + props.fragId + ')',
    css: {
      color: 'gray'
    }
  })

  $.appendChild(
    fileTitle({
      id: 'Program error',
      subtitle: $subtitle
    })
  )

  $ul.appendChild($error)
  $.appendChild($ul)

  return $
}
