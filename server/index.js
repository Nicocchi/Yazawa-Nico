const app = require('./app');
const fs = require('fs');
const https = require('https');

const port = process.env.PORT || 8080;
// const httpsPort = 443;

// const ca = fs.readFileSync('yazawanico_fun.ca-bundle', 'ascii')
// const cert = fs.readFileSync('yazawanico_fun.crt', 'ascii');
// const key = fs.readFileSync('yazawanico_fun.key', 'ascii')

// const httpsOptions = {cert, ca, key};

// https.createServer(httpsOptions, app).listen(httpsPort, function () {
//     console.log(`Server listening at ${httpsPort}`);
// })

// Start the server
// const port = process.env.PORT || 8000;
app.listen(port);
console.log(`Server listening at ${port}`);