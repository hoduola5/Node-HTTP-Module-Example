// Declear http with a core module
const http = require('http');

// Declear some constants
const hostname = 'localhost';
const port = 3000;

// Setup a server 
const server = http.createServer((req, res) => {
    console.log(req.headers);

// Setting up the response
    res.statusCode = 200;  //This response means it's okay 
    res.setHeader('content-Type', 'text/html'); // This is telling the server that the conent is in html format
    res.end('<html><body><h1>Hello, World!</h1></body></html>'); //It tells the server where the response should be sent
});

// This will tell server to start by listenning 
server.listen(port, hostname, () => {
    console.log(`Server running  at http://${hostname}:${port}`);
});

