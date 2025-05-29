import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const httpServer = app.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});

// Respond to HTTP requests
app.get('/', (req, res) => {
  console.log((new Date()) + ' Received request for ' + req.url);
  res.send("hi there");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!');
});
