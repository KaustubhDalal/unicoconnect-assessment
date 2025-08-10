const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../src/DB/eventapp.db');
const db = new Database(dbPath);

module.exports = db;
