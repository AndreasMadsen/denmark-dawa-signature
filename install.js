
'use strict';
'use strong';

const endpoint = require('endpoint');
const cheerio = require('cheerio');
const http = require('http');
const path = require('path');
const fs = require('fs');

const docUrl = 'http://dawa.aws.dk/replikeringdok';
const uniqueCollums = require('./signature.json');

http.get(docUrl, function (res) {
  res.pipe(endpoint(function (err, content) {
    if (err) throw err;
    const data = [];

    const $ = cheerio.load(content.toString());
    const sections = $('section > section');

    sections.each(function (index, section) {
      const $section = $(section);
      const $table = $section.find('table');
      if ($table.length === 0) return;

      let href;
      $section.find('pre').each(function (index, pre) {
        let thisHref = $(pre).text();
        if (thisHref.slice(0, 3) !== 'GET') return;
        thisHref = thisHref.slice(4);
        if (path.basename(thisHref) !== 'haendelser') return;
        href = thisHref;
      });
      const name = path.basename(href.slice(0, -11));
      const table = tableToArray($, name, $table.last());
      const attachment = name.indexOf('tilknytninger') !== -1;

      data.push({ href, name, attachment, table });
    });

    fs.writeFileSync(
      path.resolve(__dirname, 'index.json'),
      JSON.stringify(data, null, '\t')
    );
  }));
});

function tableToArray($, tableName, table) {
  const rows = [];

  $(table).find('tr').each(function (index, row) {
    const tds = $(row).find('td');

    if ($(tds[0]).text() === '') {
      const description = $(tds[4]).text();
      const name = $(tds[1]).text();

      rows.push({
        name: name,
        type: $(tds[2]).text(),
        sqltype: uniqueCollums[tableName].types[name],
        unique: uniqueCollums[tableName].primary.indexOf(name) !== -1,
        optional: $(tds[3]).text() === 'ja',
        description: description,
        deprecated: description.indexOf('DEPRECATED') !== -1
      });
    }
  });

  return rows;
}
