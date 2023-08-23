

const db = require('../db/db'); 

// Function to get all roles
async function getAllRoles() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM role');
    return rows;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

// Function to add a new role
async function addRole(title, salary, departmentId) {
  try {
    const [result] = await db.execute(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, departmentId]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error inserting into database:', error);
    throw error;
  }
}

module.exports = {
  getAllRoles,
  addRole
};
