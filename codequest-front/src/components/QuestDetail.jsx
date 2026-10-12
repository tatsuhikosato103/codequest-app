export default function QuestDetail({ quest, onBack, onDelete }) {
  return (
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
          onClick={onBack}
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
            {quest?.title}
          </p>

          <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>【状態】</p>
          <p
            style={{
              margin: "0 0 15px 0",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            {quest?.isCompleted ? "完了" : "未完了"}
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
            {quest?.description}
          </p>
        </div>

        <button
          onClick={() => onDelete(quest?.questId)}
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
}
