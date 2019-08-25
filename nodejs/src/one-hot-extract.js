const extractPath = require("./extract-path.js")

function oneHotExtract(objectArray, extractKeys, config) {
  return objectArray.map(obj => {
    const newObj = {}
    for (const path of extractKeys) {
      newObj[path] = extractPath(obj, path, config)
    }
    return newObj
  })
}

module.exports = oneHotExtract
