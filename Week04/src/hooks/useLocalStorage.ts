export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      if (typeof value === "string") {
        window.localStorage.setItem(key, value); // 문자열은 그대로 저장
      } else {
        window.localStorage.setItem(key, JSON.stringify(value)); // 객체일 때만 stringify
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      return window.localStorage.getItem(key); // 그대로 반환 (JWT 문자열엔 JSON.parse 불필요)
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};

/*
window.localStorage.setItem(key, JSON.stringify(value));
→ 문법상 문제 없음.
→ 하지만 JWT 같은 문자열을 저장할 때는 문제 생김.
왜냐면 JSON.stringify("eyJ...")의 결과는
"\"eyJhbGciOi...\""   // 따옴표까지 감싼 문자열
이렇게 돼서 실제로 로컬스토리지에 따옴표 포함 저장됨.
 */