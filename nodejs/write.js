let express = require('express');
let app = express();
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('file.in')
});

app.use(express.json());

app.post('/write', (req, res) => {
    const lineNumber = req.body.lineNumber;

    if (lineNumber < 1 || lineNumber > 100) {
        // TODO: throw error
    }

    lineReader.on(/* 'line' */ lineNumber, function (line) {
        console.log('Line from file:', line);
        res.send({ line: line });
    });

});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})