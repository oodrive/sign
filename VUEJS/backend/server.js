//server.js
const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const dotenv = require('dotenv');

// Construct the path to the .env file in the root directory
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const app = express();
const apiProxy = httpProxy.createProxyServer();
const baseUrl = process.env.VITE_BASE_URL_SWAGGER;

app.use('/api', (req, res) => {
  // Forward the request to the API server
  apiProxy.web(req, res, { target: baseUrl, changeOrigin: true });
});

const PORT = process.env.PORT || 5171;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Proxying requests to: ${baseUrl}`);
});
