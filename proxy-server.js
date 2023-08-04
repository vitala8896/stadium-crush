const http = require('https');

const proxyHost = '200.152.113.152';
const proxyPort = 3128;
const localPort = 3000;

const proxyServer = http.createServer((req, res) => {
  const options = {
    host: proxyHost,
    port: proxyPort,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxyReq);
});

proxyServer.listen(localPort, () => {
  console.log(`Proxy server running on http://localhost:${localPort}/`);
});
