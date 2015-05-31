[![npm version](https://badge.fury.io/js/it-optional.svg)](http://badge.fury.io/js/it-optional)
[![Build Status](https://travis-ci.org/dmarcelino/it-optional.svg?branch=master)](https://travis-ci.org/dmarcelino/it-optional)
[![Dependency Status](https://david-dm.org/dmarcelino/it-optional.svg)](https://david-dm.org/dmarcelino/it-optional)


# it-optional
Mocha add-on method it.optional() which marks a test as pending if it would fail

## Overview
it-optional was created with adapter/plugin test suites in mind where a common set of tests is used to test different modules. If one or more tests is not mandatory for all it can be marked as optional using `it.optional(title, fn)`. If the test passes then its marked as "passing" if the test fails then it's marked as "pending". This way optional functionality can be tested without breaking the whole suite.

## Instalation
```
npm i it-optional -S
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
// - PENDING: should do xyz async eventually

it.optional('should do abc eventually', function(done){
  Assert.equal(1, 2);
});
// - PENDING: should do abc async eventually

// custom messages
it.optional('should do xyz eventually', 'xyz not implemented yet', function(done){
  done(new Error('oops'));
});
// - xyz not implemented yet
```
