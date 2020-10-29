let express = require('express');
let app = express();
const port = 8081;
const nthline = require('nthline');
var hash = require('hash.js');


app.use(express.json());
// app.use(cors);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    logReq(req);
    next();
});


app.post('/nodejs/sha256', (req, res, next) => {
    const firstNum = Number(req.body.firstNum);
    const secondNum = Number(req.body.secondNum);
    const sum = firstNum + secondNum;
    console.log(sum);

    if (isNaN(firstNum) || isNaN(secondNum)) {
        res.send({'result': 'Invalid Input :('});
        return;
    }

    res.set('x-test', 'ghanbar').send({'result': hash.sha256().update(sum.toString()).digest('hex')});
});


app.get('/nodejs/write', (req, res) => {
    var lineNumber = Number(req.query.lineNumber);
    console.log(lineNumber);

    if (isNaN(lineNumber)) {
        res.send({'result': 'Invalid Input :('});
        return;
    }
    if (lineNumber < 1 || lineNumber > 100) {
        res.send({'result': 'Invalid Input :('});
        return;
    }

    lineNumber = lineNumber - 1;
    nthline(lineNumber, 'file.in').then(line => {
        res.send(line)
    });
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
