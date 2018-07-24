import { el } from '@internet/dom'

import fileTitle from './fileTitle'
import errorList from './errorList'

export default function shader (props) {
  var $ = el('div')

  $.appendChild(
    fileTitle({
      id: props.id
    })
  )

  for (var ln in props.errors) {
    $.appendChild(
      errorList({
        line: ln,
        code: props.errors[ln].linecode,
        errors: props.errors[ln].errors
      })
    )
  }

  return $
}