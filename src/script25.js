
send.onclick = function () {
    result.innerHTML = textForCopy.value;
};

let test = 'test';

function setclipboard() {
    let text = document.getElementById('textForCopy').value;
    navigator.clipboard.writeText(`${test} ${text}`).then(function () {
    }, function () {
    });
}