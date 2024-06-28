import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// config
import {dispatch} from '@/store/store';
import {logoutAC} from '@/store/slices/auth';
import { STORAGE_KEYS, Storage } from '@/utility/storage';

// ----------------------------------------------------------------------

declare module 'axios' {
  export interface AxiosRequestConfig {
    __auth?: boolean;
    xScreenId?: number;
    xFeatureId?: number;
    upload?: string;
    __cors?: boolean;
  }
}

const Axios = axios.create({baseURL: "https://iot-platform-be.rinneyaws.cloud/"});

const refreshTokenUrl = `https://iot-platform-be.rinneyaws.cloud/api/auth/refresh-token`;

const defaultConfig: AxiosRequestConfig = {
  __auth: true,
  upload: '',
  __cors: false,
};

let refreshTokenRequest: any = null;

const setHeader = (config: AxiosRequestConfig, key: string, value: any) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers[key] = value;
};

const handleRefreshError = (e: Error) => {
  console.log('--- Refresh token failed --- \n', e);
  dispatch(logoutAC());
  throw new Error('Session expired');
};

const handleRefreshToken = async () => {
  try {
    const token: any = await Storage.getItem(STORAGE_KEYS.token);
    if (!token?.token || !token?.refreshToken) {
      return handleRefreshError(new Error('No token found'));
    }
    const res = await axios.post(refreshTokenUrl, {
      refreshToken: token.refreshToken,
    });

    if (res?.data?.data) {
      const payload = res.data.data;
      await Storage.setItem(STORAGE_KEYS.token, payload);

      refreshTokenRequest = null;
      return payload;
    } else {
      refreshTokenRequest = null;
      return handleRefreshError(new Error('Invalid response'));
    }
  } catch (e: any) {
    console.log('🚀 ~ handleRefreshToken ~ err:', JSON.stringify(e));
    refreshTokenRequest = null;
    return handleRefreshError(e as Error);
  }
};

const handleError401 = async (error: AxiosError) => {
  refreshTokenRequest = refreshTokenRequest || await handleRefreshToken();
  const token = await refreshTokenRequest;
  if (error.config) {
    setHeader(error.config, 'Authorization', `Bearer ${token.token}`);
    return Axios.request(error.config);
  }
};

const onRequest = async (axiosConfig: InternalAxiosRequestConfig) => {
  let config: InternalAxiosRequestConfig = {...defaultConfig, ...axiosConfig};
  if (config.__auth && !config?.headers?.Authorization) {
    const token: any = await Storage.getItem(STORAGE_KEYS.token);
    if (token?.token) {
      setHeader(config, 'Authorization', `Bearer ${token.token}`);
    }
  }
  if (config.xScreenId) {
    setHeader(config, 'x-screen-id', config.xScreenId);
  }
  if (config.xFeatureId) {
    setHeader(config, 'x-feature-id', config.xFeatureId);
  }
  if (config.upload) {
    setHeader(config, 'Content-Type', config.upload);
  }
  if (config.__cors) {
    setHeader(
      config,
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    setHeader(config, 'Access-Control-Allow-Origin', '*');
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response.data;

type apiError = {
  message: string;
  stack: string | undefined;
  httpStatusCode: number | undefined;
  [key: string]: any;
};

type dataType = {
  [key: string]: any;
};

const onResponseError = (error: AxiosError) => {
  const apiError = {
    message: error.message,
    stack: error.stack,
    httpStatusCode: error.response?.status,
  } as apiError;
  console.log('Request failed\n', apiError);
  if (error.config) {
    console.log('--- Request config --- \n', error.config);
    apiError.config = error.config;
  }
  if (error.response) {
    const {data, status, ...rest}: dataType = error.response;
    if (status === 401) {
      return handleError401(error);
    }
    console.log('--- Response --- \n', rest);
    console.log('--- Response data --- \n', data);
    apiError.response = JSON.parse(JSON.stringify(data));
    if (data?.metadata?.messages) {
      console.log('--- Messages --- \n', data.metadata.messages);
    }
  }
  let errorResData = error?.response?.data as dataType;
  if (errorResData?.metadata?.messages?.length) {
    errorResData.metadata.messages = errorResData.metadata.messages.reduce(
      (result: any, item: any) => ({
        ...result,
        [item.code]: item.value,
      }),
      {},
    );
  }
  return Promise.reject(apiError);
};

Axios.interceptors.request.use(onRequest, onRequestError);
Axios.interceptors.response.use(onResponse, onResponseError);

export default Axios;
export {handleRefreshToken};
