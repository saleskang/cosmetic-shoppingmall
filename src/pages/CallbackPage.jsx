import { useSearchParams } from "react-router-dom";

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  return (
    <div>
      <h2>카페24 인증 결과를 처리하는 페이지입니다.</h2>
      <div>code: {code}</div>
      <div>state: {state}</div>
    </div>
  );
};

export default CallbackPage;
