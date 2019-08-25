# One Hot Coder

This library is used to convert JSON objects to and from a CSV "one-hot-encoded" representation and back again. This is a useful operation in machine learning pipelines.

# Usage: NodeJS

`npm install one-hot-coder`

## Encode

```javascript
import { oneHotEncode } from "one-hot-coder"

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
])
// Outputs:
/*
[
  {
    "gender=male": 1,
    "gender=female": 0,
    "animals_i_like>cat": 1,
    "animals_i_like>dog": 1,
    "animals_i_like>giraffe": 0,
    "coolness": 0.2,
    "color_rankings.red": 10,
    "color_rankings.blue": 4
  },
  {
    "gender=female": 1,
    "gender=male": 0,
    "animals_i_like>cat": 1,
    "animals_i_like>dog": 0,
    "animals_i_like>giraffe": 1,
    "coolness": 0.9,
    "color_rankings.red": 8,
    "color_rankings.blue": null
  }
] */
```

## Extract

```javascript
import { oneHotExtract } from "one-hot-coder"

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
)
// Outputs:
/*
[
  {
    "gender=male": 1,
    "gender=female": 0,
    "animals_i_like>cat": 1,
    "coolness": 0.2,
  },
  {
    "gender=female": 1,
    "gender=male": 0,
    "animals_i_like>cat": 1,
    "coolness": 0.9,
  }
] */
```

## Decode

```javascript
import { oneHotDecode } from "one-hot-coder"

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
])
// Outputs:
/*
  [
    {
      gender: "male",
      coolness: 0.2,
      animals_i_like: ["cat", "dog"]
    },
    {
      gender: "female",
      animals_i_like: ["giraffe", "cat"],
      coolness: 0.9,
    }
  ],
 */
```

# Configuration

Config options allow you to...

- Change handling of missing values
- Only extract certain keys or specify exact keys to extract

## Config Options

Note: Some configuration parameters make it impossible to encode and decode without any loss.

| option                      | description                                                                             | example                         |
| --------------------------- | --------------------------------------------------------------------------------------- | ------------------------------- |
| `classificationToNumberMap` | Convert a classification into a number instead of one-hot encoding each classification. | `{"not-urgent": 0, "urgent":1}` |
| `ignorePrefix`              | Ignore any path prefixed with these strings.                                            | `["animals_i_like"]`            |
| `numberedClassifications`   | Convert classification into an indexed value in a list instead of one-hot encoding it   | `[["bad", "meh", "good"]]`      |

# Notation Syntax

| Syntax              | Description                                                                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path.to.value`     | Regular javascript accessor path.                                                                                                                                                                                       |
| `path.to.value=cat` | Left side of = is a regular javascript accessor path, the right side indicates the string that the key must equal. If the value is `1`, the `path.to.value === "cat"` otherwise, the `path.to.value !== "cat"`          |
| `path.to.value>cat` | Left side of > is a regular javascript accessor path, the right side indicates the string that the array contains. If the value is `1`, the `path.to.value.includes("cat")` otherwise, `!path.to.value.includes("cat")` |
