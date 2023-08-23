

const db = require('./db'); 

// Function to view all departments
async function viewAllDepartments() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM department');
    return rows;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

// Function to view all roles
async function viewAllRoles() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM role');
    return rows;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

// Function to view all employees
async function viewAllEmployees() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM employee');
    return rows;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

// Function to add a department
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

// Function to add a role
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

// Function to add an employee
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
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
