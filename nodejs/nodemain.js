let express = require('express');
let app = express();
const port = 8081;
const nthline = require('nthline');
var hash = require('hash.js');
var cors = require('cors');


app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(express.json());
// app.use(cors);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.post('/nodejs/sha256', (req, res, next) => {
    const firstNum = req.body.firstNum;
    const secondNum = req.body.secondNum;
    console.log(req.body.firstNum);
    console.log(req.body.secondNum);

    // if (typeof firstNum != "number" || typeof secondNum != "number") {
    //     response.send('Invalid Input :(');
    // }

    const sum = firstNum + secondNum;
    res.set('x-test', 'ghanbar').send({ 'result': hash.sha256().update(sum).digest('hex') });
});

app.get('/nodejs/write', (req, res, next) => {
    const lineNumber = req.query.lineNumber;
    console.log(req.query.lineNumber);

    if (lineNumber < 1 || lineNumber > 100) {
        res.send('Invalid Input :(');
    }
    res.send({"result":"sdgsrgrsdrg"});

    // nthline(4, 'file.in').then(line => res.send(line))
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});