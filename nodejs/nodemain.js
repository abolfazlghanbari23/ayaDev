let express = require('express');
let app = express();
const port = 8081;
const nthline = require('nthline');
var hash = require('hash.js');


app.use(express.json());


app.post('/nodejs/sha256', (req, res) => {
    const firstNum = (req.body.firstNum);
    const secondNum = (req.body.secondNum);
    console.log(firstNum);
    console.log(secondNum);
    const sum = firstNum + secondNum;

    if (typeof firstNum != "number" || typeof secondNum != "number") {
        res.send('Invalid Input :(');
    }

    res.set('x-test', 'ghanbar').send({ sum: hash.sha256().update(sum).digest('hex') });
});



app.get('/nodejs/write', (req, res) => {
    var lineNumber = req.params.lineNumber;
    console.log(lineNumber);


    if (typeof lineNumber != "number") {
        lineNumber = 1;
        // res.send('Invalid Input :(');
    }
    if (lineNumber < 1 || lineNumber > 100) {
        res.send('Invalid Input :(');
    }

    nthline(lineNumber, 'file.in').then(line => res.send(line))
});




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});