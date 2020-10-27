var SHA256 = require("crypto-js/sha256");

function sayHello(name) {
    console.log('Hello ' + name);
    const hashDigest = SHA256(2 + 5);
    console.log(hashDigest);
}

sayHello('Abolfazl');