import { WebSocketServer as LibWebSocketServer } from 'ws';

class WebSocketServer {

  wss;

  sendError = (ws, message) => {
    const messageObject = {
      type: 'ERROR',
      payload: message,
    };
  
    ws.send(JSON.stringify(messageObject));
  };

  sendMessage = (ws, message) => {
    const messageObject = {
      type: 'MESSAGE',
      payload: message
    };
  
    ws.send(JSON.stringify(messageObject));
  };
  
  onMessage = (data, ws) => {
    let message;
    try {
      message = JSON.parse(data);
    } catch (e) {
      this.sendError(ws, 'Wrong format');
      return;
    }
    if (message.type === 'NEW_MESSAGE') {
      this.wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }
  }
  
  onConnection = (ws) => {
    ws.send()
    ws.on('message', (data) => this.onMessage(data, ws));
  }

  setPort(port) {
    this.port = port
  }

  start() {
    if(!this.port) return console.log("[WSS] Port does not provided")
    this.wss = new LibWebSocketServer({
      port: this.port
    });

    console.log(`[WSS] WebSocket Server on port ${this.port}`)
    
    this.wss.on('connection', (ws) => this.onConnection(ws));
  }
}

let arg = new WebSocketServer()
export default arg