import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getUserApi, loginApi, signupApi } from "../config/links/api";
import { loginPage } from "../config/links/pages";
import { API_URL, AUTHORIZATION_TOKEN_NAME, AUTHORIZATION_TOKEN_PREFIX } from "../config/constants/constants";
import sessionAuthActions from "../helpers/sessionAuthActions";

type Headers = {
  Authorization?: string;
  Accept?: string;
  "Content-Type"?: string;
};

const UNAUTHORIZED_REDIRECTION_EXCLUSION: string[] = [
  getUserApi,
  loginApi,
  signupApi,
];

async function execute(action: () => Promise<AxiosResponse>, url: string) {
  try {
    const response = await action();
    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case 401:
          if (!UNAUTHORIZED_REDIRECTION_EXCLUSION.includes(url)) {
            sessionAuthActions.clear();
            location.pathname = loginPage;
          }
          break;

        default:
          break;
      }
    }

    throw e;
  }
}

function createInstance(headers: Headers): AxiosInstance {
  const instance = axios.create({
    baseURL: API_URL,
    headers,
  });

  return instance;
}

function authorizationToken(): string | null {
  const token = localStorage.getItem(AUTHORIZATION_TOKEN_NAME);
  return token;
}

const getHeaders = (): Headers => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `${AUTHORIZATION_TOKEN_PREFIX}${authorizationToken()}`,
});

function get(url: string, options?: AxiosRequestConfig<any>) {
  const headers = getHeaders();
  const instance = createInstance(headers);
  return execute(() => instance.get(url, options), url);
}

function post(url: string, payload?: unknown) {
  const headers = getHeaders();

  if (payload instanceof FormData) {
    delete headers["Content-Type"];
  }

  const instance = createInstance(headers);
  return execute(() => instance.post(url, payload), url);
}

function put(url: string, payload?: unknown) {
  const headers = getHeaders();
  const instance = createInstance(headers);
  return execute(() => instance.put(url, payload), url);
}

function __delete(url: string) {
  const headers = getHeaders();
  const instance = createInstance(headers);
  return execute(() => instance.delete(url), url);
}

export default {
  get,
  post,
  put,
  delete: __delete,
};
