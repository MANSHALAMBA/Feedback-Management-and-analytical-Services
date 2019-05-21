var fs = require('fs');
var a="original a";
function callbackClosure(a, callback) {
  return function() {
    return callback(a);
  }
};
fs.readFile('test.txt', callbackClosure( a, function(a) {
  console.log(a);
})    );
console.log("subsequent statement");
a="am changed";

