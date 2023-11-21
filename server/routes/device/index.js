const cors = require('cors');
const { WebSocketServer } = require('ws');

const initWs = (server) => {
    const wss = new WebSocketServer({
        server: server,
        path: '/devices'
    });

    return wss.on('connection', async (connection, request) => {
        connection.on('message', (data) => {
            console.log(`[MESSAGE] /devices, message connection key: ${request.headers['sec-websocket-key']}, clients size: ${wss.clients.size}`);
            console.log(`[MESSAGE] /products, contents: ${data}`);
        });
      
        connection.on('close', () => {
            wss.clients.delete(connection);
            console.log(`[CLOSE] /devices, closed connection key: ${request.headers['sec-websocket-key']}, clients size: ${wss.clients.size}`);
        });

        console.log(`[CONNECTION] /devices, new connection received: ${request.headers['sec-websocket-key']}, clients size: ${wss.clients.size}`);
    });
};

const initRest = (wss, app) => {

    // GET /products (READ)
    app.get('/devices', cors(), async (request, response, next) => {
        response.json(JSON.stringify(wss.clients));
    });

    console.log("Mapped product routes and sockets");
};

const initDevices = (server, app) => {
    initRest(
        initWs(server),
        app
    );
};

module.exports = { initDevices };