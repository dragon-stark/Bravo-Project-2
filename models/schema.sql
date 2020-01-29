DROP DATABASE IF EXISTS employees_db;

CREATE database employees_db;

USE employees_db;

CREATE TABLE reviews
(
    employee_id INT NOT NULL
    AUTO_INCREMENT,
    last_name
        VARCHAR
    (25) NOT NULL,
    first_name VARCHAR
    (25) NOT NULL,
    department VARCHAR
    (45) NOT NULL,
    attitute INT,
    communication INT,
    efficiency INT,
    proficiency INT,
    Reliability INT,
    PRIMARY KEY
    (employee_id)
);

    SELECT *
    FROM reviews;