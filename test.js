/* eslint quotes:0 */

'use strict';
'use strong';

const signature = require('./schema.json');
const test = require('tap').test;

test('count tables', function (t) {
  t.deepEqual(Object.keys(signature), [
    'postnumre', 'vejstykker', 'adgangsadresser',
    'adresser', 'ejerlav', 'regionstilknytninger',
    'kommunetilknytninger', 'postnummertilknytninger',
    'sognetilknytninger', 'politikredstilknytninger',
    'opstillingskredstilknytninger', 'valglandsdelstilknytninger',
    'zonetilknytninger', 'jordstykketilknytninger'
  ]);
  t.end();
});
