import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;

    // Node.js(Express) API로 code를 전달
    axios.post("http://localhost:5001/api/cafe24/token", { code })
      .then(res => {
        setToken(res.data.access_token);
        // 필요하면 localStorage.setItem("cafe24_token", res.data.access_token);
      })
      .catch(err => {
        setError(JSON.stringify(err.response?.data || err.message));
      });
  }, [code]);

  return (
    <div>
      <h2>카페24 인증 결과를 처리하는 페이지입니다.</h2>
      <div>code: {code}</div>
      <div>state: {state}</div>
      {token && (
        <div>
          <strong>Access Token:</strong>
          <pre>{token}</pre>
        </div>
      )}
      {error && (
        <div>
          <strong className="text-red-500">에러:</strong>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default CallbackPage;
