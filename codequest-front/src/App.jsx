import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 現在表示している画面を管理するState ('login', 'list', 'create', 'detail')
  const [currentView, setCurrentView] = useState("login");

  // クエストデータと選択中のクエストを管理するState
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);

  // --- API通信処理 ---
  // クエスト一覧取得
  const fetchQuests = () => {
    fetch("http://localhost:8080/api/quests")
      .then((response) => response.json())
      .then((data) => setQuests(data))
      .catch((error) => console.error("データ取得エラー:", error));
  };

  // 画面が 'list' に切り替わった時にデータを取得する
  useEffect(() => {
    if (currentView === "list") {
      fetchQuests();
    }
  }, [currentView]);

  // クエスト登録
  const handleAddQuest = (newQuestData) => {
    fetch("http://localhost:8080/api/quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestData),
    })
      .then((response) => response.json())
      .then(() => {
        setCurrentView("list"); // 登録成功したら一覧画面に戻る
      })
      .catch((error) => console.error("登録エラー:", error));
  };

  // クエスト完了
  const handleCompleteQuest = (questId) => {
    fetch(`http://localhost:8080/api/quests/${questId}/complete`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then(() => {
        fetchQuests(); // 成功したら一覧を再取得して画面を更新する
      })
      .catch((error) => console.error("完了エラー:", error));
  };

  // クエスト削除
  const handleDeleteQuest = (questId) => {
    // 誤操作防止のために確認メッセージを出す
    if (!window.confirm("本当にこのクエストを破棄しますか？")) {
      return;
    }

    fetch(`http://localhost:8080/api/quests/${questId}`, {
      method: "DELETE",
    })
      .then(() => {
        setCurrentView("list"); // 成功したら一覧画面に戻る（戻ると自動で一覧が再取得される）
      })
      .catch((error) => console.error("削除エラー:", error));
  };

  // --- 画面切り替えハンドラー ---
  const goToDetail = (quest) => {
    setSelectedQuest(quest);
    setCurrentView("detail");
  };

  // ログイン画面
  const renderLogin = () => (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "blue", marginBottom: "40px" }}>CodeQuest</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentView("list");
        }}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            ログインID
          </label>
          <input
            type="text"
            style={{ padding: "8px", width: "200px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            パスワード
          </label>
          <input
            type="password"
            style={{ padding: "8px", width: "200px" }}
            required
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 40px",
              backgroundColor: "#e6f2ff",
              border: "1px solid #b3d4ff",
              cursor: "pointer",
            }}
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );

  //クエスト一覧（トップ）画面
  const renderList = () => (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "blue", margin: 0 }}>CodeQuest</h2>
        <div style={{ textAlign: "right", fontSize: "14px" }}>
          <div>ステータス</div>
          <div>Lv.1 EXP: 0</div>
        </div>
      </header>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={() => setCurrentView("create")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e6f2ff",
            border: "1px solid #b3d4ff",
            cursor: "pointer",
          }}
        >
          + 新しいクエストの登録
        </button>
      </div>

      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <p style={{ fontSize: "14px", color: "#555" }}>
          ▼ 受注済みクエスト一覧
        </p>
        {quests.map((quest) => (
          <div
            key={quest.questId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={() => goToDetail(quest)}
              style={{
                flexGrow: 1,
                marginRight: "10px",
                padding: "10px",
                backgroundColor: "#e6f2ff",
                border: "1px solid #b3d4ff",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {quest.title}
            </button>

            <button
              onClick={() => handleCompleteQuest(quest.questId)}
              style={{
                padding: "10px 20px",
                backgroundColor: quest.isCompleted ? "#e9ecef" : "#fff3cd",
                border: "1px solid #ffeeba",
                cursor: quest.isCompleted ? "not-allowed" : "pointer",
                color: quest.isCompleted ? "#6c757d" : "#000",
              }}
            >
              {quest.isCompleted ? "完了済" : "完了"}
            </button>
          </div>
        ))}
      </div>

      <footer
        style={{
          marginTop: "50px",
          borderTop: "1px solid #ccc",
          paddingTop: "10px",
        }}
      >
        <button
          onClick={() => setCurrentView("login")}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          ログアウト
        </button>
      </footer>
    </div>
  );

  // クエスト登録画面
  const renderCreate = () => {
    const onSubmit = (e) => {
      e.preventDefault();
      handleAddQuest({
        title: e.target.title.value,
        description: e.target.description.value,
      });
    };

    return (
      <div>
        <header style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "blue", margin: 0 }}>CodeQuest</h2>
        </header>

        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <p>・新規クエスト登録</p>
          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                クエスト名
              </label>
              <input
                name="title"
                type="text"
                style={{ width: "100%", padding: "8px" }}
                required
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                詳細
              </label>
              <textarea
                name="description"
                style={{ width: "100%", padding: "8px", minHeight: "80px" }}
              ></textarea>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeeba",
                  cursor: "pointer",
                }}
              >
                クエストを登録する
              </button>
              <button
                type="button"
                onClick={() => setCurrentView("list")}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  cursor: "pointer",
                }}
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // クエスト詳細画面
  const renderDetail = () => (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "blue", margin: 0 }}>CodeQuest</h2>
        <button
          onClick={() => setCurrentView("list")}
          style={{ padding: "5px 15px", cursor: "pointer" }}
        >
          戻る
        </button>
      </header>

      <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
        <h3 style={{ marginBottom: "30px" }}>クエスト詳細</h3>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>
            【クエスト名】
          </p>
          <p
            style={{
              margin: "0 0 15px 0",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            {selectedQuest?.title}
          </p>

          <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>【状態】</p>
          <p
            style={{
              margin: "0 0 15px 0",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            {selectedQuest?.isCompleted ? "完了" : "未完了"}
          </p>

          <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>【詳細】</p>
          <p
            style={{
              margin: "0 0 30px 0",
              padding: "10px",
              border: "1px solid #ccc",
              minHeight: "60px",
            }}
          >
            {selectedQuest?.description}
          </p>
        </div>

        <button
          onClick={() => handleDeleteQuest(selectedQuest.questId)}
          style={{
            padding: "10px 30px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            cursor: "pointer",
          }}
        >
          クエストを破棄
        </button>
      </div>
    </div>
  );

  // --- メインの描画領域 ---
  // currentViewの値に応じて、表示する関数を切り替える
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        border: "1px solid #eee",
        minHeight: "600px",
      }}
    >
      {currentView === "login" && renderLogin()}
      {currentView === "list" && renderList()}
      {currentView === "create" && renderCreate()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}

export default App;
