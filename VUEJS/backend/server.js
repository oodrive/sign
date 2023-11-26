const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const apiProxy = httpProxy.createProxyServer();
const baseUrl = process.env.VITE_BASE_URL_SWAGGER;

app.use('/api', (req, res) => {
  // Forward the request to the API server
  apiProxy.web(req, res, { target: 'baseUrl', changeOrigin: true });
});

const PORT = process.env.PORT || 5170;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
