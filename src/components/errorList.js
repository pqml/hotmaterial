import { el } from '@internet/dom'

import lineCode from './lineCode'
import error from './error'

export default function errorList (props) {
  var $ = el('div')
  var $ul = el('ul')
  $.appendChild(lineCode(props.line, props.code))
  $.appendChild($ul)

  for (var ln in props.errors) {
    $ul.appendChild(
      error({
        code: props.errors[ln].code,
        msg: props.errors[ln].msg
      })
    )
  }

  return $
}