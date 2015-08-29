#denmark-dawa-signature

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

```json
signature.postnumre = {
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
```

## Source

I made a [pull request to DAWA](https://github.com/DanmarksAdresser/Dawa/pull/417) that exposes
this information. But it hasn't yet gone into production. This module
has a copy of the information in `download.json`. When my pull requests
goes into production, I will change the module such it fetches it on install.

##License

**The software is license under "MIT"**

> Copyright (c) 2015 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
