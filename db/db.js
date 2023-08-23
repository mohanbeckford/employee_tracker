// db/db.js

const mysql = require('mysql2');

// Create a connection pool with Promises support
const pool = mysql.createPool({
  host: 'localhost',        //  MySQL host
  user: 'root',     // MySQL username
  password: 'Beeswasp2001@', //  MySQL password
  database: 'employee_db',  // database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for use in other modules
module.exports = pool.promise();
