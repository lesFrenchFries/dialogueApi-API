CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(100) NOT NULL UNIQUE,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    location VARCHAR(50) NOT NULL,
    specialization VARCHAR(50) NOT NULL 
    specialist INT NOT NULL,
);