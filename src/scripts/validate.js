import render from './render'
import parseErrors from './parseErrors'

var $, gl

function initGlContext () {
  $ = document.createElement('canvas')
  gl = $.getContext('webgl') ||
    $.getContext('webgl-experimental') ||
    $.getContext('experimental-webgl')

  // Add all supported extensions
  var exts = gl.getSupportedExtensions()
  for (var i = 0, l = exts.length; i < l; i++) gl.getExtension(exts[i])
}

function shader (type, code) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, code)
  gl.compileShader(shader)
  return shader
}

function validateShader (shader, id, code) {
  var errors = gl.getShaderInfoLog(shader)
  if (errors.length > 0) {
    if (id) render(id, parseErrors(errors, code))
    return false
  } else {
    if (id) render(id, {})
    return true
  }
}

function programId (vid, fid) {
  return vid && fid ? vid + '___linked___' + fid : null
}

function validateProgram (vs, fs, vid, fid) {
  var program = gl.createProgram()
  var id = programId(vid, fid)
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    id && render(id, {
      programError: true,
      vertId: vid,
      fragId: fid,
      error: info
    })
    return false
  } else {
    gl.deleteProgram(program)
    id && render(id, {})
    return true
  }
}

export default function validate (state) {
  if (!gl) initGlContext()

  // gl context can't be init, juste return true to discard hotreloading
  if (!gl) return true

  var vs = shader(gl.VERTEX_SHADER, state.vertNext)
  var success = validateShader(vs, state.vertId, state.vertNext)
  var fs = shader(gl.FRAGMENT_SHADER, state.fragNext)
  success &= validateShader(fs, state.fragId, state.fragNext)

  if (success) {
    success &= validateProgram(vs, fs, state.vertId, state.fragId)
  } else {
    render(programId(state.vertId, state.fragId), {})
  }

  gl.deleteShader(vs)
  gl.deleteShader(fs)
  return success
}
