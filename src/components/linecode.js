import { el } from '@internet/dom'

function escapeRegex (str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
}

function escapeHtml (unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function highlightError (code, errors) {
  var ncode = code
  var cached = []
  for (var k in errors) {
    var error = errors[k]
    var needle = escapeRegex(error.code.slice(1, -1))
    if (~cached.indexOf(needle)) continue
    cached.push(needle)
    if ((code.match(new RegExp(needle, 'g')) || []).length > 1) continue
    ncode = ncode.replace(new RegExp('(' + needle + ')', ''), '__###err___$1__///err___')
  }
  ncode = escapeHtml(ncode)
  ncode = ncode.replace(
    /__###err___(.+?)__\/\/\/err___/g,
    '<span style="border-bottom: 1px dotted #fc5759">$1</span>'
  )
  return ncode
}

export default function linecode (props) {
  var $ = el('pre', {
    css: {
      display: 'inline-block',
      background: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '5px',
      padding: '12px 15px',
      margin: '20px 0 0 0',
      fontFamily: '"Monaco", Courier, monospace'
    }
  })

  var $ln = el('span', {
    textContent: props.line,
    css: {
      color: 'gray',
      marginRight: '13px'
    }
  })

  var $code = el('span', {
    innerHTML: highlightError(props.code, props.errors),
    css: {
      color: 'white'
    }
  })

  $.appendChild($ln)
  $.appendChild($code)
  return $
}
