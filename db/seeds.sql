DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES
("Sales"),
("Engineer"),
("Accounting"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales lead", 80000, 1),
("Salesman", 50000, 1),

("IT manager", 140000, 2),
("Developer", 100000, 2),

("Account manager", 130000, 3),
("Accountant", 80000, 3),

("Hr manager", 150000, 4),
("Hr rep", 75000, 4);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Annie", "Lee", 1, null),
("Bobby", "Rodd", 2, 1),
("Cindy", "Quinn", 2, 1 ),

("David", "Henry", 3, null),
("Eddie", "Chen", 4, 4),
("Fiona", "Scott", 4, 4),

("Gina", "Jones", 5, null),
("Hayes", "Polin", 6, 7),
("Issac", "Adam", 6, 7),

("Jack", "Catwalk", 7, null),
("Kevin", "Dom", 8, 10),
("Larry", "Oscar", 8, 10);
