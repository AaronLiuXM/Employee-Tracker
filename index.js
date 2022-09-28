const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");

runApp();

function runApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "Please select one of the option",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.start) {
        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;
      }
    });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  });
}

//title id department salary
function viewRoles() {
  db.query(
    `SELECT 
      role.id AS 'ID', 
      role.title AS 'role.title', 
      role.salary AS 'salary', 
      department.name AS 'department' 
    FROM role 
    LEFT JOIN department 
    ON role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      runApp();
    }
  );
}

//id, f.name, l.name, title, department, salary, manager
function viewEmployee() {
  db.query(
    `SELECT 
      employee.id AS 'ID',
      employee.first_name AS 'first_name',
      employee.last_name AS 'last_name',
      role.title AS 'title',
      role.salary AS 'salary',
      department.name AS 'department',
      CONCAT(manager.first_name, ' ', manager.last_name) AS 'manager'
    FROM employee 
    LEFT JOIN role
      ON employee.role_id = role.id
    LEFT JOIN department
      ON role.department_id = department.id
    LEFT JOIN employee manager
      ON manager.id = employee.manager_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      runApp();
    }
  );
}

function addRole() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "Please enter the new role",
        },
        {
          type: "list",
          name: "dept",
          message: "Please select the department",
          choices: function () {
            var deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        },
        {
          type: "number",
          name: "salary",
          message: "Please enter the salary",
        },
      ])
      .then(function (answer) {
        let department_id;
        for (let j = 0; j < res.length; j++) {
          if (res[j].name == answer.dept) {
            department_id = res[j].id;
          }
        }
        db.query(
          "INSERT INTO role SET?",
          {
            title: answer.role,
            department_id: department_id,
            salary: answer.salary,
          },
          function (err, res) {
            if (err) throw err;
            console.log("New role is added successfully");
            runApp();
          }
        );
      });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "Please enter the name of the new department",
      },
    ])
    .then(function (answer) {
      var query = `INSERT INTO department (name)
    VALUES ('${answer.newDept}')`;
      db.query(query, function (err, res) {
        console.log(`${answer.newDept} added successfully`);
      });
      runApp();
    });
}

db.connect((err) => {
  if (err) throw err;
});
