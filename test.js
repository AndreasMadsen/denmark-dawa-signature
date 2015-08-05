/* eslint quotes:0 */

'use strict';
'use strong';

const signature = require('./index.json');
const test = require('tap').test;

test('count tables', function (t) {
  t.equal(signature.length, 15);
  t.end();
});
