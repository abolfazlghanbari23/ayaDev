var SHA256 = require("crypto-js/sha256");
let express = require('express');
let app = express();



app.use(express.json());
    app.post('/sha256', (req, res) => {
        const firstNum = req.body.firstNum;
        const secondNum = req.body.secondNum;
        const sum = firstNum + secondNum;
        res.send({ sum: SHA256(sum)});
    });

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})




