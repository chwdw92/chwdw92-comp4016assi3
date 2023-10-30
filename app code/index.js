
const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();

// content-type - application/json
app.use(express.json());
//  content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const fs = require('fs');
app.post('/saveString', (req, res) => {
    const data = req.body;
   
	if(data && data.data) {
		fs.writeFile("/data/assi3.txt", data.data, (err) => { 
		  if(err) {
			  res.writeHead(400);
			  res.end(`err: ${err}`);
		  }
		  else { 
		    res.writeHead(200);
			res.end(fs.readFileSync("/data/assi3.txt", "utf8")); 
		  } 
		}); 
	}else {
		res.writeHead(400);
	}
});

app.get('/getString', (req, res) => {
  const filePath = '/data/assi3.txt';
  
  if (!fs.existsSync(filePath)) {
	res.writeHead(404);
    res.end('Data does not exist');
  }else {
	fs.readFile('/data/assi3.txt', function(err, data){
		  if(err || !data) {
			  res.writeHead(404);
			  res.end('Data does not exist');
		  }else {
			  res.writeHead(200);
			  res.end(data);
		  }
	});
  }
	
});


function getCurrInMili() {
	const milliseconds = Date.now();
	return milliseconds;
}

function makeCPUBusy(){
	const stopAtMiliSec = getCurrInMili() + 180000; // 3 min max.
	
	let a = -9999999999999999999999999999999999999999;
	while(getCurrInMili() < stopAtMiliSec) {
		a += 0.0000000000000000000000001;
		console.log('busy');
	}
}


app.get('/busywait', (req, res) => {
	setTimeout(makeCPUBusy, 1000);
	
	res.writeHead(200);
	res.end('busy wait started');
});

app.listen(PORT, () => {
	console.log(`Running on localhost with port: ${PORT}`);
});
