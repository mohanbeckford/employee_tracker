-- Insert departments
INSERT INTO department (id, name) VALUES
  (1, 'HR'),
  (2, 'Engineering'),
  (3, 'Sales');

-- Insert roles
INSERT INTO role (id, title, salary, department_id) VALUES
  (1, 'HR Manager', 70000, 1),
  (2, 'Software Engineer', 80000, 2),
  (3, 'Sales Representative', 60000, 3);

-- Insert employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'Mohan', 'Beckford', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Michael', 'Johnson', 3, 1),
  (4, 'Alex', 'Brown', 2, 1),
  (5, 'Emily', 'Davis', 2, 2),
  (6, 'William', 'Wilson', 3, 3);
