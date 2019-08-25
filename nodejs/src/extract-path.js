const _ = require("lodash")

module.exports = (obj, key, config = {}) => {
  const ignorePrefix = config.ignorePrefix || []
  const numberedClassifications = config.numberedClassifications || []
  const classificationToNumberMap = config.classificationToNumberMap || {}

  if (key.includes("=")) {
    // classification
    const [path, cls] = key.split("=")
    if (_.get(obj, path)) {
      return _.get(obj, path) === cls ? 1 : 0
    } else {
      return null
    }
  } else if (key.includes(">")) {
    // set
    const [path, cls] = key.split(">")
    if (_.get(obj, path)) {
      return _.get(obj, path).includes(cls) ? 1 : 0
    } else {
      return null
    }
  } else {
    const v = _.get(obj, key)
    if (typeof v === "string") {
      const nci = numberedClassifications.findIndex(ncs => ncs.includes(v))
      if (nci === -1) {
        if (classificationToNumberMap[v] !== undefined) {
          return classificationToNumberMap[v]
        } else {
          throw new Error(
            `${v} not in numberedClassifications or classificationToNumberMap`
          )
        }
      } else {
        return numberedClassifications[nci].indexOf(v)
      }
    } else if (typeof v === "number") {
      return v
    } else {
      return null
    }
  }
}
