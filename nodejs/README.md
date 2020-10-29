# Nodejs Backend
This application runs on port 8081.

    app.listen(port, () => { do anything});

Here, we have used nthline, hash.js and express libraries.

    let app = express();
    var hash = require('hash.js');
    const nthline = require('nthline');


The nthline library is used to read the nth line of the file.

    nthline(lineNumber, 'file.in').then(line => {
        console.log(line)
    });

If the user does not enter the appropriate input, an error message will be printed.