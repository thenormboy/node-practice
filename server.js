#!/usr/bin/env node

const fs = require('fs')
const http = require('http');
const _ = require('lodash')

const server = http.createServer((req, res) => {

    const num = _.random(0, 20)
    console.log(num)

    res.setHeader('Content-Type', 'text/html')

    let path = './src/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200
            break;
        default:
            path += '404.html';
            res.statusCode = 404
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})