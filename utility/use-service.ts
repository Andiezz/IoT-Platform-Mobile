import { createContext, useContext } from "react";
import { ISocketService, SocketService } from "./socket";

export interface IServiceContainer {
  socketService: ISocketService;
}

export type IoCServiceKeyType = keyof IServiceContainer;

export class ServiceContainer implements IServiceContainer {
  socketService: ISocketService;
  constructor() {
    this.socketService = new SocketService();
  }
}

const ioc = new ServiceContainer();

const IoCContext = createContext<IServiceContainer>(ioc);

const useService = <T>(serviceKey: IoCServiceKeyType): T => {
  const context = useContext(IoCContext);
  const store = context[serviceKey];
  if (!store) {
    throw new Error("Store is not defined ");
  }
  return store as T;
};

export default useService;
