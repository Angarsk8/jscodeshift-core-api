# Description

Subset of the [jscodeshift](https://github.com/facebook/jscodeshift) core API. Intended to be as a Node.js module.

## Limitations

Supports only a fork of [Recast](https://github.com/Angarsk8/recast) for parsing JavaScript source files (it is not possible to configure other popular third-party parsers such as: [@babel/parser](https://github.com/babel/babel/tree/master/packages/babel-parser), [flow](https://github.com/facebook/flow/tree/master/packages/flow-parser) or [typescript](https://github.com/Microsoft/TypeScript)).

## Example

_Note: *Transformer functions follow the same API as in jscodeshift._

```js
const api = require('jscodeshift-core-api');

const transform = (file, api, _options) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      j(path).replaceWith(
        j.identifier(path.node.name.split('').reverse().join(''))
      );
    })
    .toSource();
}

const path = '/path/to/source-file.js';
const source = fs.readFileSync(path, 'utf8'); // or async, however you want it

const output = transform(
  {
    path,
    source
  },
  {
    jscodeshift: api
  },
  {
    foo: 'bar'
  }
)

fs.writeFileSync('path/to/output.js', output);
```
