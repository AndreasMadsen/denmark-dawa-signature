
'use strict';
'use strong';

const path = require('path');
const fs = require('fs');

const json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'download.json'))
);
const schemas = {};

for (const name of Object.keys(json)) {
  // Get the data item, containing the table collum information
  let properties;
  for (const item of json[name].schema) {
    if (item.name === 'data') {
      properties = item.properties;
      break;
    }
  }

  // Unpack properties
  const schema = {};
  for (const property of properties) {
    schema[property.name] = property;
  }

  schemas[name] = {
    source: json[name].source,
    schema: schema
  };
}

// Save schema
fs.writeFileSync(
  path.resolve(__dirname, 'schema.json'),
  JSON.stringify(schemas, null, 2)
);
