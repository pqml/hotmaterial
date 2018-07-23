var regl = require('regl')()
var hotProgram = require('../regl').default
var size = [0, 0]

window.addEventListener('resize', resize)
resize()

const program = hotProgram(require('@internet/hmr!./shader.vert'), require('@internet/hmr!./shader.frag'))

var draw = regl({
  frag: program.frag,
  vert: program.vert,
  attributes: {
    position: [
      -2, 0,
      0, -2,
      2, 2
    ]
  },
  uniforms: {
    time: function (f) { return 0.01 * f.tick },
    resolution: function () { return size }
  },
  depth: {
    enable: false
  },
  count: 3
})

regl.frame(function () {
  regl.clear({ color: [0, 0, 0, 1] })
  draw()
})

function resize () {
  size[0] = window.innerWidth
  size[1] = window.innerHeight
}