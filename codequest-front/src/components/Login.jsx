import { useState } from "react";
import { API_BASE_URL } from "../config";

export default function Login({ onLoginSuccess }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // エラーをリセット

    fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginId, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("IDまたはパスワードが間違っています。");
        }
        return response.json();
      })
      .then((user) => {
        // 成功したら、App.jsxにユーザー情報を渡して画面を切り替える
        onLoginSuccess(user);
      })
      .catch((err) => {
        console.error("ログインエラー:", err);
        setError(err.message);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2
        style={{
          color: "#0056b3",
          borderBottom: "2px solid #0056b3",
          paddingBottom: "10px",
        }}
      >
        CodeQuest
      </h2>

      {/* エラーメッセージの表示 */}
      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            ログインID
          </label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#e6f2ff",
            border: "1px solid #b3d4ff",
            cursor: "pointer",
            width: "100%",
          }}
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
