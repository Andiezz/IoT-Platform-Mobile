import { STATUS } from "@/constants/constant";

export abstract class ResponseDTO<T> {
  public readonly responseCode?: string;
  public readonly timestamp?: string;
  public readonly message?: string;
  public abstract readonly data: T | undefined;
}

//#region Authentication
export interface UserLoginInputModel {
  email: string;
  password: string;
}

export interface UserLoginResponseModel {
  id: string;
  role: number;
  token: string;
  email: string;
  refreshToken: string;
}

export interface CreateNewPasswordInputModel {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

//#endregion

//#region User
export interface UserResponseModel {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCode: string;
  role: number;
  avatar?: string;
}

//#endregion

//#region Thing

export interface ILocation {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface ICertificate {
  certId: string;
  certArn: string;
}

export interface IManager {
  userId: string;
  isOwner: boolean;
  id?: string;
  firstName: string;
  lastName: string;
  information: string;
  type: string;
  parameterStandards: IParameterStandardModel[];
}

export interface IThreshold {
  name: string;
  color: string;
  min: number;
  max: number;
}

export interface IParameterStandardModel {
  _id?: string;
  name: string;
  unit: string;
  weight: number;
  thresholds: IThreshold[];
}

export interface ResponseDeviceModelDTO {
  _id: string;
  name?: string;
  information?: string;
  type?: string;
  parameterStandards?: IParameterStandardModel[];
}

export interface IDevice {
  _id: string;
  name: string;
  status?: STATUS;
  model: ResponseDeviceModelDTO;
  parameterStandards: IParameterStandardModel[];
  parameterStandardDefault: boolean;
}

export interface IThingItem {
  _id?: string;
  createdOn?: string;
  updatedOn?: string;
  name: string;
  information: string;
  location: ILocation;
  status: STATUS;
  managers: IManager[];
  certificate: ICertificate;
  devices: IDevice[];
}

export interface IDeviceUpdate {
  _id: string;
  name: string;
  status?: STATUS;
  model: string;
  parameterStandards: IParameterStandardModel[];
  parameterStandardDefault: boolean;
}

export interface IThingItemUpdate {
  _id?: string;
  createdOn?: string;
  updatedOn?: string;
  name: string;
  information: string;
  location: ILocation;
  status: STATUS;
  managers: IManager[];
  certificate: ICertificate;
  devices: IDeviceUpdate[];
}

export interface ThingResponseModel {
  paginatedResults?: IThingItem[];
  current?: number;
  limit?: number;
  page?: number;
  total?: number;
}

//#endregion

//#region Dashboard

export enum TypeFilterDate {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  total = 'total'
}

export interface IChart {
  'pm2.5'?: number;
  pm10?: number;
  temperature?: number;
  humidity?: number;
  lpg?: number;
  ch4?: number;
  co?: number;
  alcohol?: number;
  co2?: number;
  toluen?: number;
  nh4?: number;
  aceton?: number;
  tvoc?: number;
  chartType?: TypeFilterDate;
  _id?: string;
  time?: string;
}

export interface IEvaluatedParameter {
  name: string;
  value: number;
  unit: string;
  weight: number;
  threshold: {
    name: string;
    color: string;
    min: number;
    max: number;
  };
  type: string;
  iaqiValue?: number;
}

export interface IGeneralIaqiReport {
  generalIaqi: number;
}

export interface IAQResult {
  generalIaqiReport: IGeneralIaqiReport;
  acceptableSubstances: IEvaluatedParameter[];
  unAcceptableSubstances: IEvaluatedParameter[];
}

export interface ITimeseriesData {
  'pm2.5'?: number;
  pm10?: number;
  temperature?: number;
  humidity?: number;
  lpg?: number;
  ch4?: number;
  co?: number;
  alcohol?: number;
  co2?: number;
  toluen?: number;
  nh4?: number;
  aceton?: number;
  tvoc?: number;
}

export interface IQualityReport {
  iaqResult: IAQResult;
  timeseriesData: ITimeseriesData[];
}

export interface IOverviewThing {
  thingDetail: IThingItem;
  timeseriesData?: IChart[];
  thingWarning?: any;
  qualityReport?: IQualityReport;
}

export interface IOverviewDaily {
  pm25?: number;
  pm10?: number;
  temperature?: number;
  humidity?: number;
  lpg?: number;
  ch4?: number;
  co?: number;
  alcohol?: number;
  co2?: number;
  toluen?: number;
  nh4?: number;
  aceton?: number;
  tvoc?: number;
}

//#endregion

//#region Notification

export interface IReceiver {
  userId: string;
  readAt: Date | null;
}

export interface INotification {
  _id: string;
  createdOn: Date;
  title: string;
  content: string;
  type: string;
  receivers: IReceiver[];
  readAt: Date | null;
}

export interface ResponseNotification {
  paginatedResults: Array<INotification>;
  page: number;
  limit: number;
  total: number;
  totalUnread: number;
}

//#endregion