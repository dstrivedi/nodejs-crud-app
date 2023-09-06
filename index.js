const http = require('http');

const getReq = require('./methods/getRequest');
const postReq = require('./methods/postRequest');
const putReq = require('./methods/putRequest');
const deleteReq = require('./methods/deleteRequest');

const movies = require('./data/movies.json');

const PORT = 3000;

const server = http.createServer((req, res) => {
    req.movies = movies;
    switch(req.method) {
        case 'GET':
            getReq(req, res);
            break;
        case 'POST':
            postReq(req, res);
            break;
        case 'PUT':
            putReq(req, res);
            break;
        case 'DELETE':
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({title: "Not found", message: "Hello NodeJS"}));
            res.end();
            break;
    }
}).listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})