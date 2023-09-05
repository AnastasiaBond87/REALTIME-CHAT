import { defineStore } from 'pinia';
import type {
  IErrorResponse,
  IUserResponse,
  TLoginRequest,
  TRegistrationRequest,
} from '@/types/api.types';
import UserApi from '@/api/UserApi';
import type { AxiosError } from 'axios';
import router from '@/router';

interface State {
  isLoading: boolean;
  error: string;
  isAuth: boolean;
  user: IUserResponse | null;
}

const initialState: State = {
  isLoading: false,
  error: '',
  isAuth: false,
  user: null,
};

const useAuthStore = defineStore('auth', {
  state: (): State => {
    return { ...initialState };
  },
  getters: {
    getAccessToken(): string | undefined {
      if (this.user) {
        const { accessToken } = this.user;
        return accessToken;
      }
    },
  },
  actions: {
    responseError(error: unknown): void {
      const { response } = error as AxiosError<IErrorResponse>;

      if (response) {
        this.error = response.data.message;
      } else {
        this.error = 'UNKNOWN_ERROR';
      }
    },
    authSuccess(user: IUserResponse): void {
      this.isAuth = true;
      this.user = user;
      router.push({ name: 'Chat' });
    },
    setLoading() {
      this.isLoading = true;
      this.error = '';
    },
    async registration({ name, email, password }: TRegistrationRequest): Promise<void> {
      this.setLoading();

      try {
        const user = await UserApi.registration({ name, email, password });
        this.authSuccess(user);
      } catch (err) {
        this.responseError(err);
      } finally {
        this.isLoading = false;
      }
    },
    async login({ email, password }: TLoginRequest): Promise<void> {
      this.setLoading();

      try {
        const user = await UserApi.login({ email, password });
        localStorage.setItem('GVGT8_accessToken', user.accessToken);
        this.authSuccess(user);
      } catch (err) {
        this.responseError(err);
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.setLoading();

      try {
        if (this.user) {
          await UserApi.logout();
          this.$reset();
          router.push({ name: 'Home' });
        }
      } catch (err) {
        this.responseError(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export { useAuthStore };
