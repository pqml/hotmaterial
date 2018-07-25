import * as THREE from 'three'
import hotmaterial from '../three'

var bigTriangle = new Float32Array([
  -2, 0, 0,
  0, -2, 0,
  2, 2, 0
])

var renderer = new THREE.WebGLRenderer()
var camera = new THREE.Camera()
var scene = new THREE.Scene()
var geometry = new THREE.BufferGeometry()
geometry.addAttribute('position', new THREE.BufferAttribute(bigTriangle, 3))

var material = hotmaterial(
  require('@internet/hmr!./shader.vert'),
  require('@internet/hmr!./shader.frag')
)(new THREE.RawShaderMaterial({
  uniforms: {
    resolution: { type: 'v2', value: new THREE.Vector2(0, 0) },
    time: { type: 'f', value: 0 }
  }
}))

var mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

function frame (t) {
  material.uniforms.time.value = (t / 1000) * 0.8
  material.uniforms.time.needsUpdate = true
  window.requestAnimationFrame(frame)
  renderer.render(scene, camera)
}

function resize () {
  material.uniforms.resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
  material.uniforms.resolution.needsUpdate = true
  renderer.setSize(window.innerWidth, window.innerHeight)
}

document.body.appendChild(renderer.domElement)
document.body.style.cssText = '' +
  'padding: 0;' +
  'margin: 0;' +
  'overflow: hidden;'
renderer.domElement.style.cssText = '' +
  'padding: 0;' +
  'margin: 0;' +
  'position: fixed;' +
  'top: 0;' +
  'left: 0;' +
  'right: 0;' +
  'bottom: 0;' +
  'width: 100%;' +
  'height: 100%;'

window.addEventListener('resize', resize)
resize()
frame()
