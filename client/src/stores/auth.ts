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
  state: (): State => initialState,
  actions: {
    handleError(error: unknown): void {
      const { response } = error as AxiosError<IErrorResponse>;

      if (response) {
        this.error = response.data.message;
      } else {
        this.error = 'UNKNOWN_ERROR';
      }
    },
    async registration({ name, email, password }: TRegistrationRequest): Promise<void> {
      this.isLoading = true;
      this.error = '';
      try {
        await UserApi.registration({ name, email, password });
        this.isAuth = true;
        router.push({ name: 'Chat' });
      } catch (err) {
        this.handleError(err);
      } finally {
        this.isLoading = false;
      }
    },
    async login({ email, password }: TLoginRequest): Promise<void> {
      this.isLoading = true;
      this.error = '';
      try {
        await UserApi.login({ email, password });
        this.isAuth = true;
        router.push({ name: 'Chat' });
      } catch (err) {
        this.handleError(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export { useAuthStore };
