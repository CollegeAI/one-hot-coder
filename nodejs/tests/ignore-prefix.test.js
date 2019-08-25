// @flow weak

const test = require("ava")
const { oneHotEncode } = require("../")

test("Ignore Prefix", t => {
  t.deepEqual(
    oneHotEncode(
      [
        {
          gender: "male",
          animals_i_like: ["cat", "dog"],
          coolness: 0.2,
          color_rankings: {
            red: 10,
            blue: 4
          }
        },
        {
          gender: "female",
          animals_i_like: ["giraffe", "cat"],
          coolness: 0.9,
          color_rankings: {
            red: 8
          }
        }
      ],
      {
        ignorePrefix: ["gender", "color_rankings", "animals_i_like>cat"]
      }
    ),
    [
      {
        "animals_i_like>dog": 1,
        "animals_i_like>giraffe": 0,
        coolness: 0.2
      },
      {
        "animals_i_like>dog": 0,
        "animals_i_like>giraffe": 1,
        coolness: 0.9
      }
    ]
  )
})
