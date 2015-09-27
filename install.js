
'use strict';
'use strong';

const endpoint = require('endpoint');
const path = require('path');
const http = require('http');
const fs = require('fs');

download(function (err, json) {
  if (err) throw err;
  save(format(json));
});

function download(callback) {
  http.get('http://dawa.aws.dk/replikeringdok/schema.json', function (res) {
    res.pipe(endpoint(function (err, content) {
      if (err) return callback(null, null);
      callback(null, JSON.parse(content));
    }));
  });
}

function format(json) {
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
      name: name,
      source: json[name].source,
      schema: schema
    };
  }

  return schemas;
}

function save(schemas) {
  fs.writeFileSync(
    path.resolve(__dirname, 'schema.json'),
    JSON.stringify(schemas, null, 2)
  );
}
