import { el } from '@internet/dom'
import shader from './shader'

export default function overlay (props) {
  var $ = el('div', { css: {
    zIndex: 50000,
    position: 'fixed',
    top: 0, right: 0, bottom: 0, left: 0,
    color: 'white',
    fontSize: '14px',
    fontFamily: '"Monaco", Courier, monospace',
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '4% 4% 3%',
    fontWeight: '200',
    overflow: 'auto'
  }})

  var k = Object.keys(props.errors)
  for (var i = k.length - 1; i >= 0; i--) {
    var $file = shader({ id: k[i], errors: props.errors[k[i]] })
    $.appendChild($file)
  }

  return $
}