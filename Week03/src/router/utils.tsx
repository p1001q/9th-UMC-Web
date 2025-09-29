// src/utils.ts
export const navigateTo = (to: string) => {
  window.history.pushState({}, '', to);
  // popstate 이벤트를 발생시켜서 라우터가 반응하도록 함
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const getCurrentPath = () => {
  return window.location.pathname;
};
