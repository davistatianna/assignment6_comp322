/*
Tatianna Davis 
COMP322
November 20, 2025
node server
*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Parse the URL
    let filePath;

    // Route handling
    if (req.url === '/' || req.url === '/index' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/introduction' || req.url === '/introduction.html') {
        filePath = path.join(__dirname, 'introduction.html');
    } else if (req.url.startsWith('/img/')) {
        // Handle image requests
        filePath = path.join(__dirname, req.url);
    } else {
        // 404 for other routes
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
        return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            // Determine content type
            const ext = path.extname(filePath);
            let contentType = 'text/html';

            switch (ext) {
                case '.html':
                    contentType = 'text/html';
                    break;
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.gif':
                    contentType = 'image/gif';
                    break;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Routes available:`);
    console.log(`  - http://localhost:${PORT}/ -> index.html`);
    console.log(`  - http://localhost:${PORT}/index -> index.html`);
    console.log(`  - http://localhost:${PORT}/introduction -> introduction.html`);
});