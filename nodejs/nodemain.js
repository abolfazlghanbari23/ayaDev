let express = require('express');
let app = express();
const port = 8081;
const nthline = require('nthline');
var hash = require('hash.js');


app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(express.json());


app.post('/nodejs/sha256', (req, res) => {
    const firstNum = req.body;
    const secondNum = req.body.secondNum;
    console.log(req.body.firstNum);
    console.log(req.body.secondNum);

    // if (typeof firstNum != "number" || typeof secondNum != "number") {
    //     response.send('Invalid Input :(');
    // }

    const sum = firstNum + secondNum;
    res.set('x-test', 'ghanbar').send({ sum: hash.sha256().update(sum).digest('hex') });
});

app.post('/nodejs/write', (req, res) => {
    const lineNumber = req.body.lineNumber;
    console.log(req.body.lineNumber);

    if (lineNumber < 1 || lineNumber > 100) {
        res.send('Invalid Input :(');
    }

    nthline(lineNumber, 'file.in').then(line => res.send(line))
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});