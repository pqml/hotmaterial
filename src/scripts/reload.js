import validate from './validate'

var VERT_DEF = 'precision mediump float;void main () { gl_Position = vec4(0., 0., 0., 1.); }'
var FRAG_DEF = 'precision mediump float;void main () { gl_FragColor = vec4(0., 0., 0., 1.); }'

export default function reload (state) {
  if (validate(state)) {
    state.initialized = true
    state.vertActive = state.vertNext
    state.fragActive = state.fragNext
    return true
  } else {
    if (state.initialized) return
    state.vertActive = VERT_DEF
    state.fragActive = FRAG_DEF
    return false
  }
}
