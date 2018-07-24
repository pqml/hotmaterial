import createOverlay from '../components/overlay'
import createShader from '../components/shader'

var $
var errors = {}
var visible = false
var renderRequested = false

function render (id, obj) {
  var hasErrors = !!(Object.keys(obj).length > 0)
  console.log(hasErrors)
  if (hasErrors) errors[id] = obj
  else if (!hasErrors && errors[id]) delete errors[id]
  defferRender()
}

function defferRender () {
  if (!renderRequested) {
    requestAnimationFrame(defferedRender)
    renderRequested = true
  }
}

function defferedRender () {
  renderRequested = false
  if ($) $.parentNode.removeChild($)
  $ = createOverlay({errors: errors})
  document.body.appendChild($)
}

export default render
