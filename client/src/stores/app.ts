import { defineStore } from 'pinia';
import type { TTheme } from '@/types/common.types';

interface State {
  theme: TTheme;
  isModalVisible: boolean;
}

const initialState: State = {
  theme: (localStorage.getItem('GVGT8_THEME') ?? 'light') as TTheme,
  isModalVisible: false,
};

const useAppStore = defineStore('app', {
  state: (): State => initialState,
  actions: {
    switchTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
        document.body.removeAttribute('data-theme');
      } else {
        this.theme = 'dark';
        document.body.setAttribute('data-theme', 'dark');
      }
    },
    showModal(value: boolean) {
      this.isModalVisible = value;
    },
  },
});

export { useAppStore };
