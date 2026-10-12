import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import QuestCreate from "./components/QuestCreate";
import QuestDetail from "./components/QuestDetail";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // --- API通信処理 ---
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("login");
  };

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

  // クエスト登録画面
  const renderCreate = () => {
    return (
      <QuestCreate
        currentUser={currentUser}
        onAddQuest={handleAddQuest}
        onCancel={() => setCurrentView("list")}
      />
    );
  };

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
      .then((response) => {
        if (!response.ok) throw new Error("サーバーでの完了処理に失敗しました");
        return response.json();
      })
      .then(() => {
        fetchQuests();
        // 成功した場合のみ画面上のEXPを更新
        setCurrentUser((prevUser) => {
          if (!prevUser) return prevUser;
          const newExp = prevUser.exp + 100;
          const newLevel = 1 + Math.floor(newExp / 300);
          return { ...prevUser, exp: newExp, level: newLevel };
        });
      })
      .catch((error) => {
        console.error("完了エラー:", error);
        alert("クエストの完了に失敗しました。");
      });
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
  const renderLogin = () => {
    return (
      <Login
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentView("list");
        }}
      />
    );
  };

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
          <div>{currentUser?.loginId} ステータス</div>
          <div style={{ fontWeight: "bold" }}>
            Lv.{currentUser?.level} EXP: {currentUser?.exp}
          </div>
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
          onClick={handleLogout}
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

  // クエスト詳細画面
  const renderDetail = () => {
    return (
      <QuestDetail
        quest={selectedQuest}
        onBack={() => setCurrentView("list")}
        onDelete={handleDeleteQuest}
      />
    );
  };

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
