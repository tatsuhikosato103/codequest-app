[CodeQuest]今日の学習が経験値になる、あなただけのクエストボード[学習タスク管理アプリ]

アプリのURL
https://codequest-app-two.vercel.app/
[テスト用アカウント]
-ログインID: user
-パスワード: password

アプリ概要
「CodeQuest」は、日常のタスクを「クエスト」として見立て、完了することで経験値（EXP）を獲得し、レベルアップしていくタスク管理アプリケーションです｡

開発の背景
プログラミング学習を進める中で、自分自身のタスク管理や学習記録をより楽しく、モチベーションを維持しながら行えるツールが欲しいと考え、
本アプリを開発しました。単なるToDoリストではなく、RPGのような成長要素を取り入れることで、ユーザーがタスク達成に達成感を感じられる工夫をしています。

機能一覧
主要な画面と機能は以下のとおりです

1.クエスト一覧画面




<img width="279" height="420" alt="image" src="https://github.com/user-attachments/assets/4756dc28-f8f4-464d-aa7d-0122833af80b" />





-現在のステータス(レベル,EXPの確認)
-受注済みクエスト一覧

2. クエスト登録画面
<img width="296" height="428" alt="image" src="https://github.com/user-attachments/assets/385f8aa9-b745-4cf9-ba07-e2c846da9331" />





- 新規クエスト(タイトル・詳細)の登録

3. クエスト詳細画面
<img width="391" height="534" alt="image" src="https://github.com/user-attachments/assets/3559187b-6eea-4a27-b1d6-ed8c610eaf0a" />






- クエストの詳細確認
- クエストの削除

4. ログイン
<img width="275" height="354" alt="image" src="https://github.com/user-attachments/assets/150ec3af-1016-40e9-9943-238a64ff248f" />





- ID・パスワードによる認証

使用技術
-フロントエンド Javascript
-バックエンド Java
-データベース PostgreSQL (Neon)
-インフラ Vercel (フロント), Render (バックエンド, Docker)
-環境構築 Docker
-バージョン管理 Git,GitHub

ER図
```mermaid
erDiagram
    USERS ||--o{ QUESTS : "受注する"
    
    USERS {
        int id PK
        string loginId
        string password
        int level
        int exp
    }
    
    QUESTS {
        int questId PK
        string title
        string description
        boolean isCompleted
        int userId FK
    }
