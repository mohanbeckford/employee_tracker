
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  calculateTotalBudget
} = require('./db/queries'); 

async function mainMenu() {
  const choices = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Update an employee manager',
    'View employees by manager',
    'View employees by department',
    'Delete a department',
    'Delete a role',
    'Delete an employee',
    'View total utilized budget of a department',
    'Exit'
  ];

  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices
  });

  switch (action) {
    case 'View all departments':
      const departments = await viewAllDepartments();
      console.table('Departments:', departments);
      break;
    case 'View all roles':
      const roles = await viewAllRoles();
      console.table('Roles:', roles);
      break;
    case 'View all employees':
      const employees = await viewAllEmployees();
      console.table('Employees:', employees);
      break;
    case 'Add a department':
      const departmentName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
      });
      await addDepartment(departmentName.name);
      console.log('Department added successfully!');
      break;
    case 'Update an employee manager':
      const employeeManagerData = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee to update:'
        },
        {
          type: 'input',
          name: 'newManagerId',
          message: 'Enter the ID of the new manager:'
        }
      ]);
      const updateManagerResult = await updateEmployeeManager(
        employeeManagerData.employeeId,
        employeeManagerData.newManagerId
      );
      if (updateManagerResult) {
        console.log('Employee manager updated successfully!');
      } else {
        console.log('Failed to update employee manager.');
      }
      break;
    case 'View employees by manager':
      const managerId = await inquirer.prompt({
        type: 'input',
        name: 'managerId',
        message: 'Enter the ID of the manager:'
      });
      const employeesByManager = await viewEmployeesByManager(managerId.managerId);
      if (employeesByManager.length > 0) {
        console.table('Employees by Manager:', employeesByManager);
      } else {
        console.log('No employees found for this manager.');
      }
      break;
    case 'View employees by department':
      const departmentId = await inquirer.prompt({
        type: 'input',
        name: 'departmentId',
        message: 'Enter the ID of the department:'
      });
      const employeesByDepartment = await viewEmployeesByDepartment(departmentId.departmentId);
      if (employeesByDepartment.length > 0) {
        console.table('Employees by Department:', employeesByDepartment);
      } else {
        console.log('No employees found in this department.');
      }
      break;
    case 'Delete a department':
      const deleteDepartmentId = await inquirer.prompt({
        type: 'input',
        name: 'departmentId',
        message: 'Enter the ID of the department to delete:'
      });
      const deleteDepartmentResult = await deleteDepartment(deleteDepartmentId.departmentId);
      if (deleteDepartmentResult) {
        console.log('Department deleted successfully!');
      } else {
        console.log('Failed to delete department.');
      }
      break;
    case 'Delete a role':
      const deleteRoleId = await inquirer.prompt({
        type: 'input',
        name: 'roleId',
        message: 'Enter the ID of the role to delete:'
      });
      const deleteRoleResult = await deleteRole(deleteRoleId.roleId);
      if (deleteRoleResult) {
        console.log('Role deleted successfully!');
      } else {
        console.log('Failed to delete role.');
      }
      break;
    case 'Delete an employee':
      const deleteEmployeeId = await inquirer.prompt({
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to delete:'
      });
      const deleteEmployeeResult = await deleteEmployee(deleteEmployeeId.employeeId);
      if (deleteEmployeeResult) {
        console.log('Employee deleted successfully!');
      } else {
        console.log('Failed to delete employee.');
      }
      break;
    case 'View total utilized budget of a department':
      const budgetDepartmentId = await inquirer.prompt({
        type: 'input',
        name: 'departmentId',
        message: 'Enter the ID of the department:'
      });
      const totalBudget = await calculateTotalBudget(budgetDepartmentId.departmentId);
      console.log(`Total budget of the department: $${totalBudget}`);
      break;
    case 'Exit':
      console.log('Exiting the application.');
      process.exit();
    default:
      console.log('Invalid choice. Please select a valid option.');
  }

  // Return to main menu
  mainMenu();
}

// Start the application
mainMenu();
