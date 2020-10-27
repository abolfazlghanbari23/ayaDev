const url = require('url');
const http = require('http');

const host = "127.0.0.1";
const port = 8081;

const requestListener = function (request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`Hello from nodejs`);
    response.end();
}
const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});