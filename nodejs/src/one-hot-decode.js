const _ = require("lodash")

function oneHotDecode(objectArray, config) {
  return objectArray.map(obj => {
    const newObj = {}

    for (const key in obj) {
      if (key.includes("=")) {
        const [path, cls] = key.split("=")
        if (obj[key] === 1) {
          _.set(newObj, path, cls)
        }
      } else if (key.includes(">")) {
        const [path, cls] = key.split(">")
        if (obj[key] === 1) {
          _.set(newObj, path, (_.get(newObj, path) || []).concat([cls]))
        }
      } else {
        const path = key
        _.set(newObj, path, obj[key])
      }
    }

    return newObj
  })
}

module.exports = oneHotDecode
