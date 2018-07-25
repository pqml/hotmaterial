var TYPENAMES = {
  vert: 'vertex',
  frag: 'fragment'
}

function subInit (state, type, obj) {
  if (obj.__hmr) {
    state[type + 'Next'] = obj.module
    if (obj.id) state[type + 'Id'] = obj.id
  } else {
    console.warn('You have to load the ' + TYPENAMES[type] + ' shader with @internet/hmr to enable hot reloading')
    if (typeof obj === 'string') state[type + 'Next'] = obj
  }
}

export default function init (state, vertObj, fragObj) {
  subInit(state, 'vert', vertObj)
  subInit(state, 'frag', fragObj)
}
