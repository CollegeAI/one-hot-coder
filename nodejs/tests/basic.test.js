// @flow weak

const test = require("ava")
const { oneHotEncode } = require("../")

test("README Example", t => {
  t.deepEqual(
    oneHotEncode([
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
    ]),
    [
      {
        "gender=male": 1,
        "gender=female": 0,
        "animals_i_like>cat": 1,
        "animals_i_like>dog": 1,
        "animals_i_like>giraffe": 0,
        coolness: 0.2,
        "color_rankings.red": 10,
        "color_rankings.blue": 4
      },
      {
        "gender=female": 1,
        "gender=male": 0,
        "animals_i_like>cat": 1,
        "animals_i_like>dog": 0,
        "animals_i_like>giraffe": 1,
        coolness: 0.9,
        "color_rankings.red": 8,
        "color_rankings.blue": null
      }
    ]
  )
})
