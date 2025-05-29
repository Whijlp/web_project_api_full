const fs = require('fs');
const path = require('path');

const requestLogPath = path.join(__dirname, 'request.log');
const errorLogPath = path.join(__dirname, 'error.log');

function logRequest(data) {
  fs.appendFile(requestLogPath, JSON.stringify(data) + '\n', err => {
    if (err) console.error('Error escribiendo en request.log:', err);
  });
}

function logError(data) {
  fs.appendFile(errorLogPath, JSON.stringify(data) + '\n', err => {
    if (err) console.error('Error escribiendo en error.log:', err);
  });
}

module.exports = { logRequest, logError };