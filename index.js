const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded (Wunderground default)
app.use(express.urlencoded({ extended: true }));
// Also accept JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Endpoint to receive Wunderground-style POSTs
app.post('/wunderground', (req, res) => {
  console.log('--- Wunderground payload received ---');
  console.log('Headers:', req.headers['content-type']);
  console.log('Body:', req.body);
  console.log('-------------------------------------');
  // Acknowledge receipt with 200
  res.status(200).send('OK');
});

// Wunderground actually sends values as a GET with query parameters.
// Support that format as well and log the received query params.
app.get('/wunderground', (req, res) => {
  console.log('--- Wunderground GET received ---');
  console.log('User-Agent:', req.headers['user-agent']);
  console.log('Query params:', req.query);
  console.log('---------------------------------');
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
