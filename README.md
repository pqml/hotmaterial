# Hot Material
:art: Hot shader replacement and in-browser error handling (Webpack only)

<br><br>

## Requirements / Recommandations
- [webpack](https://webpack.js.org/) >= 3
- [@internet/hmr](https://github.com/pqml/hmr-loader) webpack loader to wrap your shaders in a hmr special object
- [glslify-loader](https://github.com/glslify/glslify-loader) is recommended to load your shader
- [three.js](https://github.com/mrdoob/three.js/) and [regl](https://github.com/regl-project/regl) are officialy supported but you can easily use it with another webgl library



<br><br>

## Module Installation
```sh
# using npm
$ npm install --save @internet/hotmaterial

# using yarn
$ yarn add @internet/hotmaterial
```

<br><br>

## Usage

### three.js

```js
import hotmaterial from '@internet/hotmaterial/three' // import the three implementation

const program = hotmaterial(
  // Your vertex shader - use the @internet/hmr loader as inline loader
  require('@internet/hmr!./shader.vert'),

  // Your fragment shader - use the @internet/hmr loader as inline loader
  require('@internet/hmr!./shader.frag'),

  // Options (see below)
  {}
)

const geometry = new THREE.PlaneBufferGeometry()

// Decorate your three Material with the program function
// Do not declare vertexShader and fragmentShader in the Three Material.
// hotmaterial will automatically set and reload shader source
const material = program(new THREE.RawShaderMaterial({
  uniforms: {
    time: { type: 'f', value: 0 }
  }
}))

const mesh = new THREE.Mesh(geometry, material)
```

### regl

```js
import regl from 'regl'
import hotmaterial from '@internet/hotmaterial'

const program = hotmaterial(
  // Your vertex shader - use the @internet/hmr loader as inline loader
  require('@internet/hmr!./shader.vert'),

  // Your fragment shader - use the @internet/hmr loader as inline loader
  require('@internet/hmr!./shader.frag'),

  // Options (see below)
  {}
)

const draw = regl({
  frag: program.frag, // frag is a function returning the current fragment shader source
  vert: program.vert, // vert is a function returning the current vertex shader source

  attributes: {
    position: [
      -2, 0,
      0, -2,
      2, 2
    ]
  },
  count: 3
})
```

<br><br>

## API

### `hotmaterial(vertexHMRObject, fragmentHMRObject, options)`

#### Return `{ vert, frag }
- `vert` is a function returning the current vertex shader source
- `frag` is a function returning the current fragment shader source

#### Options

##### `production` (Boolean)
- Default: `false`
- Set it to `true` to disable all reloading / code validation features.

##### `willUpdate` (Function)
- Default: `null`
- Called before any shader updates, with the shader source as first argument
- Use this to return a modified shaded content before the validation step

##### `didUpdate` (Function)
- Default: `null`
- Called after a valid shader update, with vertex and fragment shader as first and second args.
- DidUpdate is only called when shaders are valids (and just after setup)
- You can use it for custom implementations of `hot material`

##### `vertWillUpdate` (Function)
- Same as `willUpdate` property but called only before a vertex shader update

##### `fragWillUpdate` (Function)
- Same as `willUpdate` property but called only before a fragment shader update

##### `vertDidUpdate` (Function)
- Same as `didUpdate` property but called only after a fragment shader update

##### `fragDidUpdate` (Function)
- Same as `didUpdate` property but called only after a vertex shader update

<br><br>

## Middlewares

Use `willUpdate`, `fragWillUpdate` and `vertWillUpdate` to customize shader code before any update from `hotmaterial`

##### Example: inject #define statements into shader source
```js
import injectDefines from 'glsl-inject-defines'
import hotmaterial from 'hotmaterial'

const program = hotmaterial(
  require('@internet/hmr!./shader.vert'),
  require('@internet/hmr!./shader.frag'),
  {
    fragWillUpdate: (fragment) => injectDefines(fragment, { PI: 3.14 })
  }
)
```

<br><br>

## License
MIT.

<br><br>

#

<br>

_`hotmaterial` is a package of the [@internet](https://www.npmjs.com/org/internet) npm scope. :globe_with_meridians:_


_[@internet](https://www.npmjs.com/org/internet) is a collection of opinionated and interoperables front-end npm ES6 modules, with minimal external dependencies._
