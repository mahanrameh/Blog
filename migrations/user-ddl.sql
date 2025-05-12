CREATE TABLE users (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    provider ENUM('local', 'google', 'meta') NOT NULL DEFAULT 'local',
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    
    PRIMARY KEY (id),
    UNIQUE KEY users_unique_username (username),
    UNIQUE KEY users_unique_email (email)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
