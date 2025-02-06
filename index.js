// index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper functions
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  if (num <= 1) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
};

const isArmstrong = (num) => {
  const digits = String(num).split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), power),
    0
  );
  return sum === num;
};

const digitSum = (num) => {
  return String(num)
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
};

const getProperties = (num) => {
  const properties = [];

  if (isArmstrong(num)) {
    properties.push("armstrong");
  }

  properties.push(num % 2 === 0 ? "even" : "odd");

  return properties;
};

app.get("/api/classify-number", async (req, res) => {
  try {
    const number = Number(req.query.number);

    if (isNaN(number) || !Number.isInteger(number)) {
      return res.status(400).json({
        number: req.query.number,
        error: true,
      });
    }

    // Get fun fact from Numbers API
    let funFact;
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/math`);
      funFact = response.data;
    } catch (error) {
      // generate a default fun fact for Armstrong numbers If Numbers API fails
      if (isArmstrong(number)) {
        const digits = String(number).split("");
        const power = digits.length;
        funFact = `${number} is an Armstrong number because ${digits
          .map((d) => `${d}^${power}`)
          .join(" + ")} = ${number}`;
      } else {
        funFact = `${number} is ${number % 2 === 0 ? "even" : "odd"}`;
      }
    }

    const result = {
      number: number,
      is_prime: isPrime(number),
      is_perfect: isPerfect(number),
      properties: getProperties(number),
      digit_sum: digitSum(number),
      fun_fact: funFact,
    };

    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "Number Classification API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
