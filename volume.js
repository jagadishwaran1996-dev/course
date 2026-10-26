const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const express = require('express');

const env_value = process.argv[2] || "development";
dotenv.config({ path: `.env.${env_value}` });

const app = express();

const logDir = '/app/logs';
const logFile = path.join(logDir, 'app.log');

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

const PORT = process.env.PORT;
const APP = process.env.APP;

function log(message) {
	const time = new Date().toISOString(); 
                const finalMessage = `[${time}] [${env_value.toUpperCase()}] ${message}`;
	console.log(finalMessage);
		fs.appendFileSync(logFile, finalMessage + '\n');
}
app.get('/', (req, res) => {
	res.send('Hello world from express from ' + APP);
});

app.get('/health', (req,res) => {
	log("Health check called");
	res.status(200).json({
		status: "UP"
	});
});
app.listen(PORT , (req, res) => {
	log("Server is running on port " + PORT);
});
