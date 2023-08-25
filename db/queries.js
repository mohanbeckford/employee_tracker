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
async function addEmployee(firstName, lastName, roleId, managerId = null) {
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
    console.error('Error updating employee role:', error);
    throw error;
  }
}

// Function to update an employee's manager
async function updateEmployeeManager(employeeId, newManagerId) {
  try {
    const [result] = await db.execute(
      'UPDATE employee SET manager_id = ? WHERE id = ?',
      [newManagerId, employeeId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating employee manager:', error);
    throw error;
  }
}

async function deleteEmployee(employeeId) {
  try {
    const [result] = await db.execute('DELETE FROM employee WHERE id = ?', [employeeId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
}

async function deleteDepartment(departmentId) {
  try {
    const [result] = await db.execute('DELETE FROM department WHERE id = ?', [departmentId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
}

async function deleteRole(roleId) {
  try {
    const [result] = await db.execute('DELETE FROM role WHERE id = ?', [roleId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
}

async function viewEmployeesByManager(managerId) {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM employee WHERE manager_id = ?', [managerId]);
    return rows;
  } catch (error) {
    console.error('Error querying employees by manager:', error);
    throw error;
  }
}

async function viewEmployeesByDepartment(departmentId) {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)', [departmentId]);
    return rows;
  } catch (error) {
    console.error('Error querying employees by department:', error);
    throw error;
  }
}

async function calculateTotalBudget(departmentId) {
  try {
    const [rows, fields] = await db.execute(
      'SELECT SUM(salary) AS total_budget FROM role WHERE department_id = ?',
      [departmentId]
    );
    return rows[0].total_budget;
  } catch (error) {
    console.error('Error calculating total budget:', error);
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
  updateEmployeeRole,
  updateEmployeeManager,
  deleteEmployee,
  deleteDepartment,
  deleteRole,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  calculateTotalBudget
};
