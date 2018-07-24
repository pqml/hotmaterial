
export default function parseErrors (errors, code) {
  errors = errors.split('ERROR:')
  var splittedcode = code.split(/\n/)
  var list = {}

  for (let i = 0; i < errors.length; i++) {
    if (errors[i].length < 3) continue

    var splitted = errors[i].trim().split(':')
    var l1 = splitted.shift().trim()
    var line = splitted.shift().trim()
    var extract = splitted.shift().trim()
    var msg = splitted.join(':').trim()

    if (!list[line]) list[line] = { linecode: splittedcode[line - 1].trim(), errors: {} }

    list[line].errors[extract + '-|||-' + msg] = {
      code: extract,
      msg: msg
    }
  }

  return list
}
