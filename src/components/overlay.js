import { el } from '@internet/dom'
import shader from './shader'
import program from './program'

export default function overlay (props) {
  var $ = el('div', {
    css: {
      zIndex: 50000,
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      color: 'white',
      fontSize: '14px',
      fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      background: 'rgba(35, 35, 35, 0.8)',
      padding: '4% 4% 3%',
      fontWeight: '200',
      overflow: 'auto'
    }
  })

  var k = Object.keys(props.errors)

  var linkErrors = []
  var errors = []
  var i

  for (i = k.length - 1; i >= 0; i--) {
    if (props.errors[k[i]].programError) {
      linkErrors.push(props.errors[k[i]])
    } else {
      errors.push({ id: k[i], errors: props.errors[k[i]] })
    }
  }

  for (i = 0; i < linkErrors.length; i++) {
    $.appendChild(program(linkErrors[i]))
  }

  for (i = 0; i < errors.length; i++) {
    $.appendChild(shader(errors[i]))
  }

  return $
}
