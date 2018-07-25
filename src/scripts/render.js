import overlay from '../components/overlay'

var $
var errors = {}
var renderRequested = false

function render (id, obj) {
  var hasErrors = !!(Object.keys(obj).length > 0)
  if (hasErrors) errors[id] = obj
  else if (!hasErrors && errors[id]) delete errors[id]
  defferRender()
}

function defferRender () {
  if (!renderRequested) {
    window.requestAnimationFrame(defferedRender)
    renderRequested = true
  }
}

function defferedRender () {
  renderRequested = false
  if ($) {
    $.parentNode.removeChild($)
    $ = undefined
  }
  if (Object.keys(errors).length > 0) {
    $ = overlay({errors: errors})
    document.body.appendChild($)
  }
}

export default render
