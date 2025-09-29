import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
//보통 확장자 제거하나요? GPT 왈로는 안 쓴다는디.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
//<App /> 
// JSX 문법: <App></App>의 축약형

/*
<App />의 의미
"App 컴포넌트를 호출해서 여기다 렌더링해줘"라는 뜻.

사실 내부적으로는 그냥 함수 호출:
App()   // React가 JSX 문법을 함수 호출로 바꿔줌
즉, <App /> = React.createElement(App) 이렇게 바뀌는 거.
*/