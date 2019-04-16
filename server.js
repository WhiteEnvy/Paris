// var express = require('express');
// var app = express();
// var http = require('http').Server(app);

// // app.use('/', express.static(__dirname));
// // app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
// // http.listen(4500, () =>  console.log('listening on :4500'));

// app.set('port', (process.env.PORT || 4000));
// app.use('/', express.static(__dirname));



// http.listen(app.get('port'), function() {
//     console.log('Server started: http://localhost:' + app.get('port') + '/');
// });
// // server.listen(port, "0.0.0.0");

const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);