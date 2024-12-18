import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    sizeAddition: 0,
    language: 'EN',
  },
  reducers: {
    increaseSize(state) {
      if (state.sizeAddition < 20) {
        state.sizeAddition += 2;
      }
    },
    decreaseSize(state) {
      if (state.sizeAddition > -10) {
        state.sizeAddition -= 2;
      }
    },
    changeLanguage(state) {
      state.language = state.language === 'EN' ? 'RU' : 'EN';
    },
  },
});

export default settingsSlice;
export const { increaseSize, decreaseSize, changeLanguage } =
  settingsSlice.actions;
