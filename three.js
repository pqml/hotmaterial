import defhotmaterial from './src'

function noop () {}

export default function hotmaterial (vert, frag, opts) {
  return function (threematerial) {
    opts = opts || {}
    var origVertDidUpdate = opts.vertDidUpdate || noop
    var origFragDidUpdate = opts.fragDidUpdate || noop
    opts = Object.assign({}, {
      vertDidUpdate: vertDidUpdate,
      fragDidUpdate: fragDidUpdate
    }, opts)

    defhotmaterial(vert, frag, opts)
    return threematerial

    function vertDidUpdate (nVert) {
      threematerial.vertexShader = nVert
      threematerial.needsUpdate = true
      origVertDidUpdate(nVert)
    }

    function fragDidUpdate (nFrag) {
      threematerial.fragmentShader = nFrag
      threematerial.needsUpdate = true
      origFragDidUpdate(nFrag)
    }
  }
}
