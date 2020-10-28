var SHA256 = require("crypto-js/sha256");
let express = require('express');
let app = express();
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('file.in')
});
const host = "127.0.0.1";
const port = 8081;

app.use(express.json());


app.post('nodejs/sha256', (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    const firstNum = request.body.firstNum;
    const secondNum = request.body.secondNum;
    if (typeof firstNum != "number" || typeof secondNum != "number") {
        //todo: throw error
    }
    const sum = firstNum + secondNum;
    response.send({ sum: SHA256(sum) });
});

app.post('/nodejs/write', (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    const lineNumber = request.body.lineNumber;

    if (lineNumber < 1 || lineNumber > 100) {
        // TODO: throw error
    }

    lineReader.on(/* 'line' */ lineNumber, function (line) {
        console.log('Line from file:', line);
        response.send({ line: line });
    });

});


app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})