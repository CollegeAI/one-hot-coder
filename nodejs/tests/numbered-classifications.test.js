// @flow weak

const test = require("ava")
const { oneHotEncode } = require("../")

test("Numbered Classifications", t => {
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
        numberedClassifications: [["awful", "bad", "meh", "good", "great"]]
      }
    ),
    [
      {
        rating: 3
      },
      {
        rating: 1
      },
      {
        rating: 0
      }
    ]
  )
})
