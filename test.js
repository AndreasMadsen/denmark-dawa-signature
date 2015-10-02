/* eslint quotes:0 */

'use strict';
'use strong';

const schema = require('./index.js');
const test = require('tap').test;

test('count tables', function (t) {
  schema(function (err, info) {
    t.ifError(err);
    t.deepEqual(Object.keys(info), [
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
