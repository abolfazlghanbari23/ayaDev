let express = require('express');
let app = express();
const port = 8081;
const nthline = require('nthline');
var hash = require('hash.js');


app.use(express.json());


app.post('/nodejs/sha256', (req, res) => {
    const firstNum = Number(req.body.firstNum);
    const secondNum = Number(req.body.secondNum);
    const sum = firstNum + secondNum;
    console.log(sum);

    if (isNaN(firstNum) || isNaN(secondNum)) {
        res.send('Invalid Input :(');
        return;
    }
    res.set('x-test', 'ghanbar').send({ sum: hash.sha256().update(sum).digest('hex') });
});



app.get('/nodejs/write', (req, res) => {
    var lineNumber = Number(req.query.lineNumber);
    console.log(lineNumber);

    if (isNaN(lineNumber)) {
        res.send('Invalid Input :(');
        return;
    }
    if (lineNumber < 1 || lineNumber > 100) {
        res.send('Invalid Input :(');
        return;
    }

    lineNumber = lineNumber - 1;

    if (typeof lineNumber != "number") {
        res.send('Invalid Input :(');
        return;
    }

    nthline(lineNumber, 'file.in').then(line => { res.send(line) });
});




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

function logReq(req) {
    console.log('====================================');
    console.log('headers: ', (req.headers));
    console.log('query: ', (req.query));
    console.log('params: ', (req.params));
    console.log('body: ', (req.body));

}