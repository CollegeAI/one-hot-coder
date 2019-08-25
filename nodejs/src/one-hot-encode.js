// @flow weak

const _ = require("lodash")
const extractPath = require("./extract-path.js")

function paths(obj, parentKey, config) {
  if (!parentKey) parentKey = ""
  const ignorePrefix = config.ignorePrefix || []
  const numberedClassifications = config.numberedClassifications || []
  const classificationToNumberMap = config.classificationToNumberMap || {}

  var result

  if (ignorePrefix.some(ignorePrefix => parentKey.startsWith(ignorePrefix))) {
    return []
  }

  if (_.isArray(obj)) {
    return obj.map(p => parentKey + ">" + p)
  } else if (_.isPlainObject(obj)) {
    result = _.flatMap(_.keys(obj), function(key) {
      return paths(obj[key], key, config)
        .filter(
          subkey =>
            !ignorePrefix.some(ip => (parentKey + subkey).startsWith(ip))
        )
        .filter(subkey => obj[subkey] !== undefined)
        .map(subkey => {
          let v
          v = obj[subkey]
          if (typeof v === "string") {
            if (_.flatten(numberedClassifications).some(nc => nc === v)) {
              return (parentKey ? parentKey + "." : "") + subkey
            } else if (classificationToNumberMap[v] !== undefined) {
              return (parentKey ? parentKey + "." : "") + subkey
            } else {
              return (parentKey ? parentKey + "." : "") + subkey + `=${v}`
            }
          } else {
            return (parentKey ? parentKey + "." : "") + subkey
          }
        })
    })
    return result
  } else {
    result = []
  }
  return result.concat(parentKey || [])
}

function oneHotEncode(objectArray, config = {}) {
  const allPaths = new Set(
    _.flatMap(objectArray, obj => paths(obj, null, config))
  )
  return objectArray.map(obj => {
    const newObj = {}
    for (const path of allPaths) {
      newObj[path] = extractPath(obj, path, config)
    }
    return newObj
  })
}

module.exports = oneHotEncode
