// @flow weak

const test = require("ava")
const { oneHotDecode } = require("../")

test("README Decode Example", t => {
  t.deepEqual(
    oneHotDecode([
      {
        "gender=male": 1,
        "gender=female": 0,
        "animals_i_like>cat": 1,
        "animals_i_like>dog": 1,
        "animals_i_like>giraffe": 0,
        coolness: 0.2
      },
      {
        "gender=female": 1,
        "gender=male": 0,
        "animals_i_like>cat": 1,
        "animals_i_like>dog": 0,
        "animals_i_like>giraffe": 1,
        coolness: 0.9
      }
    ]),
    [
      {
        gender: "male",
        coolness: 0.2,
        animals_i_like: ["cat", "dog"]
      },
      {
        gender: "female",
        animals_i_like: ["cat", "giraffe"],
        coolness: 0.9
      }
    ]
  )
})
