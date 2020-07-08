CREATE TABLE msgs(
    msg_id INT PRIMARY KEY,
    msg VARCHAR(255),
    usr_id INT
);

CREATE TABLE usrs(
    usr_id INT PRIMARY KEY,
    uname VARCHAR(255),
    msg_id INT,
    FOREIGN KEY (msg_id) REFERENCES msgs(msg_id)
);