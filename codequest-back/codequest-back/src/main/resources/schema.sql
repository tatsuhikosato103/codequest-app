DROP TABLE IF EXISTS quests;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY,
                       login_id VARCHAR(50) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       level INT NOT NULL DEFAULT 1,
                       exp INT NOT NULL DEFAULT 0
);

CREATE TABLE quests (
                        quest_id INT AUTO_INCREMENT PRIMARY KEY,
                        user_id INT NOT NULL,
                        title VARCHAR(100) NOT NULL,
                        description TEXT,
                        is_completed BOOLEAN NOT NULL DEFAULT FALSE,
                        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);