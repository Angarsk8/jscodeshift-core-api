# Description

Subset of the [jscodeshift](https://github.com/facebook/jscodeshift) core API. Intended to be used as a Node.js module.

## Limitations

Supports only a fork of [Recast](https://github.com/Angarsk8/recast) for parsing JavaScript source files (it is not possible to configure other popular third-party parsers such as: [@babel/parser](https://github.com/babel/babel/tree/master/packages/babel-parser), [flow](https://github.com/facebook/flow/tree/master/packages/flow-parser) or [typescript](https://github.com/Microsoft/TypeScript)).

## Example

_Note: *Transformer functions follow the same API as in jscodeshift._

```js
const core = require('jscodeshift-core-api');

const revertIdentifiers = (file, api, _options) {
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

const output = revertIdentifiers(
  {
    path,
    source
  },
  {
    jscodeshift: core,
    j: core
  },
  {
    foo: 'bar'
  }
)

fs.writeFileSync('path/to/output.js', output);
```

Or you can write your own helper function to make the API a bit cleaner:

```javascript
const core = require('jscodeshift-core-api');

const createTransform = transformer => (sourcePath, options) =>
  new Promise((resolve, reject) => {
    fs.readFile(sourcePath, 'utf8', (error, sourceContent) => {
      if (error) {
        reject(error);
        return;
      }

      const file = {
        path: sourcePath,
        source: sourceContent
      };

      const api = {
        jscodeshift: core,
        j: core
      };

      try {
        const output = transformer(file, api, options);
        resolve(output)
      } catch (error) {
        reject(error);
      }
    });
  });

const transform = createTransform(reverseIdentifiers);

transform(filePath, { exlcude: ['foo'] })
  .then(output => doWhateverYouWantWith(output));
```
