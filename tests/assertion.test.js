const assert = require('assert');

console.log('Running simple assertion tests...');

assert.strictEqual(1 + 1, 2);

assert.strictEqual('Node.js'.toUpperCase(), 'NODE.JS');

assert.ok(true);

console.log('All assertion tests passed!');
