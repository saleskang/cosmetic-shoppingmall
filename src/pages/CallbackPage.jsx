import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const clientId = import.meta.env.VITE_CAFE24_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CAFE24_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_CAFE24_REDIRECT_URL;
const mallId = import.meta.env.VITE_CAFE24_MALL_ID;

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        const base64 = btoa(`${clientId}:${clientSecret}`);

        const res = await axios.post(
          `https://${mallId}.cafe24api.com/api/v2/oauth/token`,
          new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
          }),
          {
            headers: {
              Authorization: `Basic ${base64}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setToken(res.data.access_token);
        // 필요하다면 localStorage.setItem("cafe24_token", res.data.access_token);
      } catch (err) {
        setError(JSON.stringify(err.response?.data || err.message));
      }
    };

    fetchToken();
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
