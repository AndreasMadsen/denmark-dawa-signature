
'use strict';
'use strong';

const endpoint = require('endpoint');
const path = require('path');
const http = require('http');

function download(callback) {
  const req = http.get('http://dawa.aws.dk/replikeringdok/schema.json', function (res) {
    res.pipe(endpoint(function (err, content) {
      if (err) return callback(null, null);
      callback(null, JSON.parse(content));
    }));
  });

  req.once('error', callback);
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

function dawaSignature(callback) {
  download(function (err, json) {
    if (err) return callback(err);
    callback(null, format(json));
  });
}
module.exports = dawaSignature;
