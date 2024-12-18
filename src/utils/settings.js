export const setLanguageF = (language, setLanguageState) => {
  localStorage.setItem('language', language);
  setLanguageState(language);
};

export const setSizeF = (size, setSizeState) => {
  localStorage.setItem('sizeAddition', String(size));
  setSizeState(size);
};
