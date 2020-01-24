DROP DATABASE IF EXISTS employees_db;

CREATE database employees_db;

USE employees_db;

CREATE TABLE reviews
(
    employee_id INT NOT NULL,
    last_name
        VARCHAR
    (25) NOT NULL,
    first_name VARCHAR
    (25) NOT NULL,
    department VARCHAR
    (45) NOT NULL,
    attitute VARCHAR
    (100),
    communication VARCHAR
    (100),
    efficiency VARCHAR
    (100),
    proficiency VARCHAR
    (100),
    Reliability VARCHAR
    (100),
    PRIMARY KEY
    (employee_id)
);

SELECT *
FROM reviews;