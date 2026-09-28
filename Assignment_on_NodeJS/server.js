const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Dictionary mapping extensions to their correct Content-Types for dependencies
const MIME_TYPES = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    
    // 1. ROUTE: Home Page
    if (req.url === '/' || req.url === '/home') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        serveHtmlFile(filePath, res);
    } 
    
    // 2. ROUTE: About Page
    else if (req.url === '/about') {
        const filePath = path.join(__dirname, 'public', 'about.html');
        serveHtmlFile(filePath, res);
    } 
    
    // 3. ROUTE: Contact Page
    else if (req.url === '/contact') {
        const filePath = path.join(__dirname, 'public', 'contact.html');
        serveHtmlFile(filePath, res);
    } 
    else if (req.url === '/services') {
        const filePath = path.join(__dirname, 'public', 'services.html');
        serveHtmlFile(filePath, res);
    } 
    
    // 4. DEPENDENCIES & ASSETS: Handles CSS, JS, Images, etc.
    else {
        const filePath = path.join(__dirname, 'public', req.url);
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {  
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 File Not Found</h1>');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end(`Server Error: ${error.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

// Helper function to keep the route definitions clean and avoid repetitive code
function serveHtmlFile(filePath, res) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error: Could not load the page.');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
}

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
