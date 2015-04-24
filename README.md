[![npm version](https://badge.fury.io/js/it-optional.svg)](http://badge.fury.io/js/it-optional)

# it-optional
Mocha add-on method it.optional() which marks a test as pending if it would fail

## Instalation
```
npm install it-optional -S
```

## Usage
```javascript
it.optional = require('it-optional');

it.optional('should do xyz', function(done){
  done();
});
// ✓ should do xyz

it.optional('should do xyz eventually', function(done){
  done(new Error('oops'));
});
// - Pending: should do xyz async eventually

it.optional('should do xyz eventually', 'xyz not implemented yet', function(done){
  done(new Error('oops'));
});
// - xyz not implemented yet
```
