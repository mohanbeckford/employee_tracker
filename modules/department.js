
const db = require('../db/db'); 

// Function to get all departments
async function getAllDepartments() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM department');
    return rows;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

// Function to add a new department
async function addDepartment(name) {
  try {
    const [result] = await db.execute(
      'INSERT INTO department (name) VALUES (?)',
      [name]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error inserting into database:', error);
    throw error;
  }
}

module.exports = {
  getAllDepartments,
  addDepartment
};
