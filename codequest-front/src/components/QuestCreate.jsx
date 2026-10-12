export default function QuestCreate({ currentUser, onAddQuest, onCancel }) {
  const onSubmit = (e) => {
    e.preventDefault();
    onAddQuest({
      title: e.target.title.value,
      description: e.target.description.value,
      userId: currentUser.id || currentUser.userId,
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
              onClick={onCancel}
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
}
