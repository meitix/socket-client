import io from "socket.io-client";
export class SocketClient {
  connectionEventEmitter;

  onConnect;
  onDisconnect;
  config = {
    serverAddress: undefined,
    room: "",
    event: ""
  };

  constructor(config) {
    this.config = config;
    this.socket = io(this.config.serverAddress);
  }

  connect() {
    // set connect event function.
    if (this.onConnect && (typeof this.onConnect).toLowerCase() === "function")
      this.addListener("connect", this.onConnect);

    this.socket.connect();
  }

  disconnect() {
    // set disconnect event function.
    if (
      this.onDisconnect &&
      (typeof this.onDisconnect).toLowerCase() === "function"
    )
      this.addListener("disconnect", this.onDisconnect);

    this.socket.disconnect();
  }

  isConnected() {
    return this.socket.connected;
  }

  emit(data) {
    console.log(this.config.event, data);
    this.socket.emit(this.config.event, data);
  }

  addListener(event, cb) {
    this.socket.on(event, cb);
  }

  removeListener(event, cb) {
    this.socket.off(event, cb);
  }
}
