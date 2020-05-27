const app = require('./app');
const fs = require('fs');
const https = require('https');

const port = process.env.PORT || 8000;

https.globalAgent.options.ca = fs.readFileSync('yazawanico_fun.ca-bundle', 'ascii');

https.createServer({
    key: fs.readFileSync('yazawanico_fun.key', 'ascii'),
    cert: fs.readFileSync('yazawanico_fun.crt', 'ascii')
}, app).listen(port, function () {
    console.log(`Server listening at ${port}`);
})

// Start the server
// const port = process.env.PORT || 8000;
// app.listen(port);
// console.log(`Server listening at ${port}`);