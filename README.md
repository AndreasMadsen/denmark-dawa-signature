#denmark-dawa-signature  [![Build Status](https://travis-ci.org/denmark-io/denmark-dawa-signature.svg?branch=master)](https://travis-ci.org/denmark-io/denmark-dawa-signature)

> Get signature information for the DAWA replication tables

## Installation

```sheel
npm install denmark-dawa-signature
```

## Documentation

```javascript
signature = require('denmark-dawa-signature')
```

[DAWA (Danmarks Adressers Web API)](http://dawa.aws.dk/) is a service provided
by the danish government, which exposes multiply APIs for getting address
related information. The service supports replication of its tables,
this module exposes information about those tables.

```javascript
signature(function (err, schema) {
	if (err) throw err;

	schema.postnumre = {
		"name": "postnumre",
		"source": "http://dawa.aws.dk/replikering/postnumre",
		"schema": {
			"nr": {
				"name": "nr",
				"description": "Unik identifikation af det postnummeret. Postnumre fastsættes af Post Danmark. Repræsenteret ved fire cifre. Eksempel: ”2400” for ”København NV”.",
				"type": "string",
				"required": true,
				"postgresql": "INTEGER",
				"primary": true,
				"deprecated": false
			},
			"navn": {
				"name": "navn",
				"description": "Det navn der er knyttet til postnummeret, typisk byens eller bydelens navn. Repræsenteret ved indtil 20 tegn. Eksempel: ”København NV”.",
				"type": "string",
				"required": true,
				"postgresql": "VARCHAR(20)",
				"primary": false,
				"deprecated": false
			},
			"stormodtager": {
				"name": "stormodtager",
				"description": "Hvorvidt postnummeret er en særlig type, der er tilknyttet en organisation der modtager en større mængde post.",
				"type": "boolean",
				"required": true,
				"postgresql": "BOOLEAN",
				"primary": false,
				"deprecated": false
			}
		}
	};
});
```

## Source

I made a [pull request to DAWA](https://github.com/DanmarksAdresser/Dawa/pull/417) that exposes
this information. The schema can now be found on http://dawa.aws.dk/replikeringdok/schema.json.
