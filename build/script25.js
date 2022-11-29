"use strict";

send.onclick = function () {
  result.innerHTML = textForCopy.value;
};
var test = 'test';
function setclipboard() {
  var text = document.getElementById('textForCopy').value;
  navigator.clipboard.writeText("".concat(test, " ").concat(text)).then(function () {}, function () {});
}