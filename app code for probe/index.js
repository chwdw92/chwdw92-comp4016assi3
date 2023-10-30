
const express = require('express');

// Constants
const PORT = 8088;

// App
const app = express();

// content-type - application/json
app.use(express.json());
//  content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get('/isAlive', (req, res) => {
   res.writeHead(200);
   res.end('Alive');
});

app.listen(PORT, () => {
	console.log(`Running on localhost with port: ${PORT}`);
});
