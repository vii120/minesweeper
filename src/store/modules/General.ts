import { defineStore } from 'pinia';
import { THEME_MAP } from '@/handler/constants';

type GeneralType = {
  theme: typeof THEME_MAP[keyof typeof THEME_MAP];
  currentToast: string[];
};

const state = (): GeneralType => ({
  theme: THEME_MAP.LIGHT,
  currentToast: [],
});

export default defineStore('general', {
  state,
  actions: {
    setThemeAttr() {
      document.body.setAttribute('data-theme', this.theme);
    },
    toggleTheme() {
      this.theme === THEME_MAP.DARK
        ? (this.theme = THEME_MAP.LIGHT)
        : (this.theme = THEME_MAP.DARK);
      this.setThemeAttr();
    },
    addToast(msg: string) {
      this.currentToast.push(msg);
    },
    removeToast() {
      this.currentToast.pop();
    },
  },
});
