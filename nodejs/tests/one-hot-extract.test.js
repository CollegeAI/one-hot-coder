// @flow weak

const test = require("ava")
const { oneHotExtract } = require("../")

test("README Extract Example", t => {
  t.deepEqual(
    oneHotExtract(
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
      ["gender=male", "gender=female", "animals_i_like>cat", "coolness"]
    ),
    [
      {
        "gender=male": 1,
        "gender=female": 0,
        "animals_i_like>cat": 1,
        coolness: 0.2
      },
      {
        "gender=female": 1,
        "gender=male": 0,
        "animals_i_like>cat": 1,
        coolness: 0.9
      }
    ]
  )
})
