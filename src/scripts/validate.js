import render from './render'
import parseErrors from './parseErrors'

var $ = document.createElement('canvas')
var gl = $.getContext('webgl')

function shader (type, code) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, code)
  gl.compileShader(shader)
  return shader
}

function validateShader(shader, id, code) {
  const errors = gl.getShaderInfoLog(shader)
  if (errors.length > 0) {
    if (id) render(id, parseErrors(errors, code))
    return false
  } else {
    if (id) render(id, {})
    return true
  }
}

export default function validate (state) {
  var vs = shader(gl.VERTEX_SHADER, state.vertNext)
  var success = validateShader(vs, state.vertId, state.vertNext)
  var fs = shader(gl.FRAGMENT_SHADER, state.fragNext)
  success &= validateShader(fs, state.fragId, state.fragNext)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  return success
}