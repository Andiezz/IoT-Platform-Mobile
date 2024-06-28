import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8888";

class SocketService {
  private socket: Socket | null = null;
  connect(token: string) {
    this.socket = io(SOCKET_URL, {
      retries: 1,
      timeout: 6000,
      auth: {
        Authorization: token ? 'Bearer ' + token : ''
      },
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  onMessage(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}

export default new SocketService();
