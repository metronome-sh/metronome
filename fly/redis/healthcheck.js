const http = require('http');
const { createClient } = require('redis');

const PORT = 8080;

const server = http.createServer((_, res) => {
  const client = createClient({
    password: process.env.REDIS_PASSWORD,
  });

  client.on('error', (err) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server is unhealthy: ' + err.message);
  });

  const value = Math.random().toString(36).substring(7);

  try {
    (async () => {
      await client.connect();

      await client.set('healthcheck', value);

      const result = await client.get('healthcheck');

      if (result !== value) {
        throw new Error('Values do not match');
      }

      await client.disconnect();

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Server is healthy');
    })();
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server is unhealthy: ' + error.message);
    (async () => {
      await client.disconnect();
    })();
  }
});

server.listen(PORT, () => {
  console.log(`Healthcheck server running on port ${PORT}`);
});
