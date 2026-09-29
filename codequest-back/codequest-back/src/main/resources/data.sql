INSERT INTO users (login_id, password, level, exp)
VALUES ('player1', 'password123', 1, 0);

INSERT INTO quests (user_id, title, description, is_completed)
VALUES
    (1, 'Spring Bootの環境構築', 'IntelliJ IDEAを使ってプロジェクトを作成する', FALSE),
    (1, 'Reactの基礎復習', 'useStateの使い方を思い出す', FALSE);