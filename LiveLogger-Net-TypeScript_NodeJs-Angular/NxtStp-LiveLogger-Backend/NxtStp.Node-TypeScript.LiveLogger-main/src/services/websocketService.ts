import WebSocket, { Server } from 'ws';
import { sockets, updateSockets } from '../main'

export class WebSocketService{

    readonly serverPort : number = 8080;
    
    public websocketServer : Server

    constructor(){
        this.websocketServer = new WebSocket.Server({ port: this.serverPort });
        this.websocketServer.on('connection', function(socket) {
          sockets.push(socket);
          // When you receive a message
          socket.on('message', function(msgFromClient) {
            console.log(msgFromClient.toString());
          });
          // When a socket closes, or disconnects, remove it from the array.
          socket.on('close', function() {
            updateSockets(sockets.filter(s => s !== socket));
          });
        });
    }
}
