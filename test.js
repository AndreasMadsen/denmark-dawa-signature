/* eslint quotes:0 */

'use strict';
'use strong';

const signature = require('./index.js');
const test = require('tap').test;

test('count tables', function (t) {
  signature(function (err, schema) {
    t.ifError(err);
    t.deepEqual(Object.keys(schema), [
      'postnumre', 'vejstykker', 'adgangsadresser',
      'adresser', 'ejerlav', 'regionstilknytninger',
      'kommunetilknytninger', 'postnummertilknytninger',
      'sognetilknytninger', 'politikredstilknytninger',
      'opstillingskredstilknytninger', 'valglandsdelstilknytninger',
      'zonetilknytninger', 'jordstykketilknytninger'
    ]);
    t.end();
  });
});
