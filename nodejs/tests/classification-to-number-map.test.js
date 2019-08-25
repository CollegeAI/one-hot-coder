// @flow weak

const test = require("ava")
const { oneHotEncode } = require("../")

test("Classification To Number Map", t => {
  t.deepEqual(
    oneHotEncode(
      [
        {
          rating: "good"
        },
        {
          rating: "bad"
        },
        {
          rating: "awful"
        }
      ],
      {
        classificationToNumberMap: {
          great: 1,
          good: 0.75,
          meh: 0.5,
          bad: 0.25,
          awful: 0
        }
      }
    ),
    [
      {
        rating: 0.75
      },
      {
        rating: 0.25
      },
      {
        rating: 0
      }
    ]
  )
})
