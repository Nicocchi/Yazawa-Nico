const app = require('./app');
const fs = require('fs');
const https = require('https');

const port = process.env.PORT || 8000;

https.createServer({
    key: fs.readFileSync('yazawanico_fun.key'),
    cert: fs.readFileSync('yazawanico_fun.cert')
}, app).listen(port, function () {
    console.log(`Server listening at ${port}`);
})

// Start the server
// const port = process.env.PORT || 8000;
// app.listen(port);
// console.log(`Server listening at ${port}`);