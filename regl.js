import { el } from '@internet/dom'

var defVert = 'precision mediump float;void main () { gl_Position = vec4(0., 0., 0., 1.); }'
var defFrag = 'precision mediump float;void main () { gl_FragColor = vec4(0., 0., 0., 1.); }'

var $canvas = document.createElement('canvas')
var gl = $canvas.getContext('webgl')

var errors = {}
var overlayVisible = false

var $overlay = el('div', { css: {
  zIndex: 50000,
  position: 'fixed',
  top: 0, right: 0, bottom: 0, left: 0,
  color: 'white',
  fontSize: '14px',
  fontFamily: '"Monaco", Courier, monospace',
  background: 'rgba(0, 0, 0, 0.4)',
  padding: '4% 4% 0',
  fontWeight: '200'
}})


function shader (type, content) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, content)
  gl.compileShader(shader)
  return shader
}

function showOverlay () {
  if (overlayVisible) return
  document.body.appendChild($overlay)
  overlayVisible = true
}

function hideOverlay() {
  if (!overlayVisible) return
  document.body.removeChild($overlay)
  overlayVisible = false
}

function removeError (id) {
  if (!errors[id]) return
  $overlay.removeChild(errors[id])
  delete errors[id]
  if (Object.keys(errors).length < 1) hideOverlay()
}

function createTitle (id) {
  return el('div', { textContent: id, css: {
    color: 'gray'
  }})
}

function parseError (error) {
  var $ = el('li')
  var splitted = error.split(':')
  var l1 = splitted.shift()
  var l2 = splitted.shift()
  var msg = splitted.join(':')

  $.appendChild(el('span', {
    textContent: l1 + ':' + l2 + ' → ',
    css: {
      color: 'gray'
    }
  }))

  $.appendChild(el('span', {
    textContent: msg,
    css: {
      color: 'white'
    }
  }))

  return $
}

function listErrors (errors) {
  var $ = el('ul', { css: {
    listStyle: 'none',
    padding: '0'
  }})
  errors = errors.split('ERROR:')
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].length < 1) continue
    $.appendChild(parseError(errors[i].trim()))
  }
  return $
}

function displayError (id, error) {
  if (errors[id]) $overlay.removeChild(errors[id])
  var $ = el('div', { css: {
    borderBottom: '1px solid #242424',
    padding: '0 0 20px 0',
    margin: '0 0 20px 0'
  }})
  $.appendChild(createTitle(id))
  $.appendChild(listErrors(error))
  errors[id] = $
  $overlay.appendChild($)
  showOverlay()
}

function handleShaderError(shader, id) {
  const error = gl.getShaderInfoLog(shader)
  if (error.length > 0) {
    if (id) displayError(id, error)
    return true
  } else {
    if (id) removeError(id)
    return false // no error -> hasError to false
  }
}

function validateProgram (vert, frag, ids) {
  var vs = shader(gl.VERTEX_SHADER, vert)
  var hasError = handleShaderError(vs, ids.vertex)
  var fs = shader(gl.FRAGMENT_SHADER, frag)
  hasError |= handleShaderError(fs, ids.fragment)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  return !hasError
}

export default function hotProgram (vertObj, fragObj) {
  var tryingProgram = { vertex: null, fragment: null }
  var activeProgram = { vertex: null, fragment: null }
  var ids = { vertex: null, fragment: null }
  var initialized = false
  var errored = false

  init('vertex', vertObj)
  init('fragment', fragObj)
  reload()

  return {
    vert: function () { return activeProgram.vertex },
    frag: function () { return activeProgram.fragment }
  }

  function init(type, obj) {
    if (obj.__hmr) {
      tryingProgram[type] = obj.module
      if (obj.watch) obj.watch(type === 'vertex' ? reloadVertex : reloadFragment)
      if (obj.id) ids[type] = obj.id
    } else {
      console.warn('You have to load the ' + type + ' shader with @internet/hmr to enable hot reloading')
      if (typeof obj === 'string') tryingProgram[type] = obj
    }
  }

  function reload () {
    if (validateProgram(tryingProgram.vertex, tryingProgram.fragment, ids)) {
      errored = false
      initialized = true
      activeProgram.vertex = tryingProgram.vertex
      activeProgram.fragment = tryingProgram.fragment
    } else {
      errored = true
      if (initialized) return
      activeProgram.vertex = defVert
      activeProgram.fragment = defFrag
    }
  }

  function reloadVertex (nVert) { tryingProgram.vertex = nVert; reload() }
  function reloadFragment (nFrag) { tryingProgram.fragment = nFrag; reload() }
}
