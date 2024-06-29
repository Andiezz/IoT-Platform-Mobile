import {
  CreateNewPasswordInputModel,
  IOverviewDaily,
  IOverviewThing,
  IThingItem,
  ResponseNotification,
  ThingResponseModel,
  UserLoginInputModel,
  UserLoginResponseModel,
  UserResponseModel,
} from "./types";
import Axios from "./base";

//#region Authentication
export const loginAPI = async (data: UserLoginInputModel) =>
  Axios.post<UserLoginResponseModel>("/api/auth/login", data, {
    __auth: false,
  });
export const forgotPasswordAPI = async (data: { email: string }) =>
  Axios.post("/api/auth/forgot-password", data, {
    __auth: false,
  });

export const cretaeNewPasswordAPI = async (data: CreateNewPasswordInputModel) =>
  Axios.post("/api/auth/create-new-password", data, {
    __auth: false,
  });

//#endregion

//#region User

export const getUserInfoAPI = async () =>
  Axios.get<UserResponseModel>("/api/user/profile");

//#endregion

//#region Thing

export const getThingListAPI = async (
  pageSize = 10,
  pageNumber = 1,
  keyword = "",
  userId: string
) =>
  Axios.get<ThingResponseModel>(
    `/api/thing?limit=${pageSize}&page=${pageNumber}&q=${keyword}&userId=${userId}`
  );

export const getThingDetailAPI = async (thingId: string) =>
  Axios.get<IThingItem>(`/api/thing/${thingId}`);

export const updateThingDetailAPI = async (thingId: string, data: IThingItem) =>
  Axios.put(`/api/thing/${thingId}`, data);

//#endregion

//#region Dashboard

export const getDashboardThingAPI = async (thingId: string) =>
  Axios.get<IOverviewThing>(`/api/dashboard/thing/${thingId}`);

export const getDashboardDailyAPI = async (thingId: string) =>
  Axios.get<IOverviewDaily[]>(`/api/dashboard/daily/${thingId}`);

//#endregion

//#region Notification

export const getNotificationAPI = async (page: number, limit: number) =>
  Axios.get<ResponseNotification>(
    `/api/notification/view?page=${page}&limit=${limit}`
  );

//#endregion
