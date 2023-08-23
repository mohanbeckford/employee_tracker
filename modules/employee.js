

const db = require('../db/db'); 

// Function to get all employees
async function getAllEmployees() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM employee');
    return rows;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

// Function to add a new employee
async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    const [result] = await db.execute(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [firstName, lastName, roleId, managerId]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error inserting into database:', error);
    throw error;
  }
}

// Function to update an employee's role
async function updateEmployeeRole(employeeId, roleId) {
  try {
    const [result] = await db.execute(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [roleId, employeeId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating database:', error);
    throw error;
  }
}

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployeeRole
};
