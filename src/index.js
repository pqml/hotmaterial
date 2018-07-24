import init from './scripts/init'
import reload from './scripts/reload'

var noop = function (c) { return c }

export default function hotmaterial (vertObj, fragObj, opts) {
  var opts = Object.assign({}, opts)

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

  init(state, vertObj, fragObj)
  state.vertNext = vertWillUpdate(state.vertNext)
  state.fragNext = fragWillUpdate(state.fragNext)

  reload(state)
  didUpdate(state.vertActive, state.fragActive)
  vertDidUpdate(state.vertActive)
  fragDidUpdate(state.fragActive)

  if (vertObj && vertObj.id && vertObj.watch) vertObj.watch(vertReload)
  if (fragObj && fragObj.id && fragObj.watch) fragObj.watch(fragReload)

  return {
    vert: function () { return state.vertActive },
    frag: function () { return state.fragActive }
  }

  function vertReload (content) {
    state.vertNext = vertWillUpdate(content);
    if (!reload(state)) return
    didUpdate(state.vertActive, state.fragActive)
    vertDidUpdate(state.vertActive)
  }

  function fragReload (content) {
    state.fragNext = fragWillUpdate(content);
    if (!reload(state)) return
    didUpdate(state.vertActive, state.fragActive)
    fragDidUpdate(state.fragActive)
  }
}