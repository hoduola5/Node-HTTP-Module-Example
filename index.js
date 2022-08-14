// Declear three core Node module
const http = require('http');
const path = require('path');
const fs = require('fs');

// Declear hostname and port
const hostname = 'localhost';
const port = 3000;

// Setup a server 
// const server = http.createServer((req, res) => {
//     console.log('Request for ' + req.url + ' by method ' + req.method);

// // Setting up the response
//     res.statusCode = 200;  //This response means it's okay 
//     res.setHeader('content-Type', 'text/html'); // This is telling the server that the conent is in html format
//     res.end('<html><body><h1>Hello, World!</h1></body></html>'); //It tells the server where the response should be sent
// });

// // This will tell server to start by listenning 
// server.listen(port, hostname, () => {
//     console.log(`Server running  at http://${hostname}:${port}`);
// });
// Setup a server
const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);
  
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
    
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
            if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
            });

            return;
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                    ' not a HTML file</h1></body></html>');

            return;
        }
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + req.method + 
                    ' not supported</h1></body></html>');

            return;
        }
  })

  server.listen(port, hostname, () => {
        console.log(`Server running  at http://${hostname}:${port}`);
    });