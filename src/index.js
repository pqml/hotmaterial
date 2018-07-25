import init from './scripts/init'
import reload from './scripts/reload'

var noop = function (c) { return c }

export default function hotmaterial (vertObj, fragObj, opts) {
  opts = Object.assign({}, opts)

  var willUpdate = opts.willUpdate || noop
  var vertWillUpdate = opts.vertWillUpdate || willUpdate
  var fragWillUpdate = opts.fragWillUpdate || willUpdate

  var didUpdate = opts.didUpdate || noop
  var vertDidUpdate = opts.vertDidUpdate || didUpdate
  var fragDidUpdate = opts.fragDidUpdate || didUpdate

  var state = {
    vertActive: '',
    fragActive: '',
    vertNext: '',
    fragNext: '',
    vertId: '',
    fragId: '',
    initialized: false
  }

  var api = {
    vert: function () { return state.vertActive },
    frag: function () { return state.fragActive }
  }

  init(state, vertObj, fragObj)

  // in production, no reloading,
  // only trigger didUpdate events
  // and hydrate active shaders states
  if (opts.production) {
    state.fragActive = state.fragNext
    state.vertActive = state.vertNext
    state.initialized = true
    didUpdate(state.vertActive, state.fragActive)
    vertDidUpdate(state.vertActive)
    fragDidUpdate(state.fragActive)
    return api
  }

  var vertReload = function (content) {
    var oldFrag = state.fragActive
    state.vertNext = vertWillUpdate(content)
    if (!reload(state)) return
    didUpdate(state.vertActive, state.fragActive)
    if (state.fragActive !== oldFrag) fragDidUpdate(state.fragActive)
    vertDidUpdate(state.vertActive)
  }

  var fragReload = function (content) {
    var oldVert = state.vertActive
    state.fragNext = fragWillUpdate(content)
    if (!reload(state)) return
    if (state.vertActive !== oldVert) vertDidUpdate(state.vertActive)
    didUpdate(state.vertActive, state.fragActive)
    fragDidUpdate(state.fragActive)
  }

  state.vertNext = vertWillUpdate(state.vertNext)
  state.fragNext = fragWillUpdate(state.fragNext)

  reload(state)
  didUpdate(state.vertActive, state.fragActive)
  vertDidUpdate(state.vertActive)
  fragDidUpdate(state.fragActive)

  if (vertObj && vertObj.id && vertObj.watch) vertObj.watch(vertReload)
  if (fragObj && fragObj.id && fragObj.watch) fragObj.watch(fragReload)

  return api
}
