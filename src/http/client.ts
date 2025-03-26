import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { parse, stringify } from 'qs';

const handleAxiosRequest = (config: InternalAxiosRequestConfig) => {
  const token = process.env.NEXT_PUBLIC_BASE_API_TOKEN ?? '';

  config.headers.setAuthorization(`Bearer ${token}`);

  return config;
};

function handleAxiosRequestError(error: AxiosError) {
  throw error;
}

function handleAxiosResponse(response: AxiosResponse<unknown, unknown>) {
  return response;
}

async function handleAxiosResponseError(error: AxiosError) {
  if (error?.response?.status === 502 || error?.code === 'ERR_NETWORK')
    throw new Error('Servidor indisponível!');

  if (error.response?.status === 401) {
    throw new Error('Sem autorização!');
  }

  throw error;
}

export const Client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 900000,
  timeoutErrorMessage: 'Tempo limite, Tente novamente mais tarde.',
  paramsSerializer: {
    encode: (params) => parse(params),
    serialize: (params) => stringify(params),
  },
});

Client.interceptors.request.use(handleAxiosRequest, handleAxiosRequestError);

Client.interceptors.response.use(handleAxiosResponse, handleAxiosResponseError);
