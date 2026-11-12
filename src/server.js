
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Simple Node.js API is running',
    status: 'success',
    runningWith: 'PM2 ready'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.post('/hello', (req, res) => {
  const name = req.body.name || 'Friend';

  res.json({
    message: `Hello, ${name}!`,
    receivedData: req.body
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start the server only when this file is executed directly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the application for automated testing.
module.exports = app;
