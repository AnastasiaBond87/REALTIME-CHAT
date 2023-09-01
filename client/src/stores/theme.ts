import { defineStore } from 'pinia';

interface State {
  theme: 'dark' | 'light';
}

const initialState: State = {
  theme: 'dark',
};

const useThemeStore = defineStore('theme', {
  state: (): State => initialState,
  actions: {
    switchTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
      } else {
        this.theme = 'dark';
      }
    },
  },
});

export { useThemeStore };
