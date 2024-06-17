CREATE DATABASE movies;
use movies;

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year VARCHAR(4) NOT NULL,
    type VARCHAR(50) NOT NULL,
    poster VARCHAR(255)
);
