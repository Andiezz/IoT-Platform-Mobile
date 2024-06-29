/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket, io } from 'socket.io-client';
const URL = process.env.EXPO_PUBLIC_BACKEND || 'http://localhost:8888';

export interface ISocketService {
  authToken: string;
  userId?: string;
  // connect: () => void;
  connect: () => void;
  subscribeEvent: (event: string, callback: (data: unknown) => unknown) => void;
  unScribeEvent: (event: string, callback?: (data: unknown) => unknown) => void;
  publish(event: string, msg: unknown): void;
  disconnect(): void;
  dispose(): void;
}
export class SocketService implements ISocketService {
  private client?: Socket<
    { [event: string]: any },
    { [event: string]: (...args: any[]) => void }
  >;
  private isConnect: boolean;
  public authToken = '';
  public userId?: string;
  private mapEventListener: Map<string, Function> = new Map();
  // private options?: Partial<ManagerOptions & SocketOptions>;
  constructor() {
    this.isConnect = false;
  }

  public connect(): void {
    if (this.isConnect) {
      return;
    }
    this.client = io(URL, {
      autoConnect: false,
      retries: 1,
      timeout: 6000,
      auth: {
        Authorization: this.authToken ? 'Bearer ' + this.authToken : ''
      },
      transports: ['polling', 'websocket']
    });
    this.client.connect();
    this.client.on('connect', () => {
      console.log('Socket Client connected');
      this.isConnect = true;
    });
    this.client.on('disconnect', (err) => {
      console.log('Socket Client disconnected: ', err);
      this.isConnect = false;
    });
  }

  public subscribeEvent(event: string, callback: (data: unknown) => unknown) {
    this.client?.on(event, callback);
    this.mapEventListener.set(event, callback);
  }

  public unScribeEvent(event: string) {
    if (this.client) this.client.off(event, this.mapEventListener.get(event));
    this.mapEventListener.delete(event);
  }

  public publish(event: string, msg: unknown): void {
    if (this.client) this.client.emit(event, msg);
  }

  public disconnect(): void {
    if (this.client) this.client.disconnect();
  }
  public dispose(): void {
    this.mapEventListener.forEach((functionRef, event) => {
      this.client?.off(event, functionRef);
    });
    this.mapEventListener = new Map();
    this.client?.disconnect();
  }
}
