
const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

const app = require('../src/server');

let server;
let baseUrl;

test.before(async () => {
  // Start the API on an available temporary port.
  server = app.listen(0);

  await once(server, 'listening');

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  // Shut down the test server.
  if (server) {
    await new Promise((resolve, reject) => {
      server.close(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
});

test('GET / should return application status', async () => {
  const response = await globalThis.fetch(`${baseUrl}/`);

  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, 'success');
  assert.equal(
    body.message,
    'Simple Node.js API is running'
  );
});

test('GET /health should return healthy status', async () => {
  const response = await globalThis.fetch(`${baseUrl}/health`);

  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, 'healthy');
  assert.equal(typeof body.uptime, 'number');
  assert.ok(Number.isFinite(Date.parse(body.timestamp)));
});

test('POST /hello should return a personalised greeting', async () => {
  const response = await globalThis.fetch(`${baseUrl}/hello`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Martins'
    })
  });

  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.message, 'Hello, Martins!');
});

test('POST /hello should use the default greeting', async () => {
  const response =await globalThis.fetch (`${baseUrl}/hello`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.message, 'Hello, Friend!');
});

test('Unknown routes should return HTTP 404', async () => {
  const response = await globalThis.fetch(`${baseUrl}/unknown`);

  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(body.status, 'error');
  assert.equal(body.message, 'Route not found');
});
