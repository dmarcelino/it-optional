// From http://stackoverflow.com/questions/14301839/javascript-asynchronous-exception-handling-with-node-js

var domain = require("domain");
module.exports = function (func) {
  var F = function () { };
  var dom = domain.create();
  F.prototype.catch = function (errHandle) {
    var args = arguments;
    dom.on("error", function (err) {
      return errHandle(err, dom);
    }).run(function () {
      func.call(null, args);
    });
    return this;
  };
  return new F();
};
