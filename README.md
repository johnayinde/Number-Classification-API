# Number Classification API

This API provides mathematical properties and fun facts about numbers. It analyzes a given number and returns various properties including whether it's prime, perfect, Armstrong, even/odd, along with its digit sum and a fun fact.

## Live Demo

API Endpoint: `https://classy-number.onrender.com/api/classify-number?number=371`

## Features

- Number classification (prime, perfect, Armstrong)
- Even/odd determination
- Digit sum calculation
- Fun facts about numbers
- CORS enabled
- Error handling
- Input validation

## Technology Stack

- Node.js
- Express.js
- Axios for HTTP requests
- CORS middleware

## API Specification

### Endpoint

```
GET /api/classify-number?number=<integer>
```

### Success Response (200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request)

```json
{
  "number": "invalid_input",
  "error": true
}
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/johnayinde/Number-Classification-API.git
```

2. Install dependencies:

```bash
cd Number-Classification-API
yarn install
```

3. Start the server:

```bash
yarn start
```

## Environment Variables

Rename `.env.example` file in the root directory:

```
PORT=3000
```

## Local Development

The API will be available at `http://localhost:3000/api/classify-number?number=371`

## Error Handling

The API includes comprehensive error handling:

- Invalid input validation
- Numbers API service disruption handling
- Internal server error handling
