CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub VARCHAR(100) NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    location VARCHAR(50) NOT NULL,
    specialist INT(20) NOT NULL
);

