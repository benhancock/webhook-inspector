import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import pg from 'pg';
import { WebSocketServer } from 'ws'

const app = express()
const PORT = process.env.PORT || 3000;

const eventSchema = new mongoose.Schema({
  endpointString: String,
  timestamp: Number,
  contents: {
    method: String,
    path: Object,
    headers: Object,
    query: Object,
    body: Object,
}}, {
  toJSON: {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  }
});

const Event = mongoose.model("Event", eventSchema)

async function addEventToMongo(newEventContents) {
  const event = await Event.create(newEventContents)
  return {id: event._id, timestamp: event.timestamp}
}

async function addEventToPostgres(urlEndpointId, eventMongoId, eventMongoTimestamp) {
  let connectionString = 'postgresql://request_bin_be:requestbin@localhost:5432/request_bin_be'
  let pgClient = new pg.Client(connectionString)
  pgClient.connect()
  pgClient.query(`INSERT INTO events (url_endpoints_id, request_info, time_received) values (${urlEndpointId}, '${eventMongoId}', '${eventMongoTimestamp}');`);
}

function addEvent(requestObj, endpointId) {
  mongoose.connect('mongodb://requestbin_be:requestbin@127.0.0.1:27017/requestbin_be')
  
  addEventToMongo(requestObj)
    .then((eventMongoData) => {
      return addEventToPostgres(endpointId, eventMongoData.id, eventMongoData.timestamp)
    })
    .catch(error => {
      console.error(error);
    });
}

async function getEndpointId(endpointString) {
  let connectionString = 'postgresql://request_bin_be:requestbin@localhost:5432/request_bin_be'
  let pgClient = new pg.Client(connectionString)
  pgClient.connect()
  let results = pgClient.query(`SELECT id FROM url_endpoints WHERE endpoint='${endpointString}';`);
  return results
}

async function sendRequestObjToClients(requestObj) { // for websockets
  let endpoint = '0cce-217-180-201-58'
  if (endpointClients[endpoint]) {
    endpointClients[endpoint].forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(requestObj));
      }
    });
  }
}

function captureRequestDetails(req, res, next) {
  const nowTimestamp = new Date().getTime()
  let successStatus;
  let endpointString = req.headers.host.split('.')[0]
  let requestObj = {
    endpointString: endpointString,
    timestamp: nowTimestamp,
    contents: {
      method: req.method,
      path: req.path,
      headers: req.headers,
      query: req.query,
      body: req.body
    }
  }
  getEndpointId(endpointString)
    .then((queryResults) => {
      let endpointId;
      if (queryResults.rows[0]) {
        endpointId = queryResults.rows[0].id
        addEvent(requestObj, endpointId)
        successStatus = true;
      } else {
        successStatus = false;
      }
    })
    .then(() => {
      sendRequestObjToClients(requestObj)
    })
    .then(() => {
      next()
    })
    .then(() => {
      res.send({success: successStatus})
    })
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(captureRequestDetails);

const server = app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });

let endpointClients = {}

const wsServer = new WebSocketServer({ server });

wsServer.on('connection', (ws) => {
  let subscribedEndpoint = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.subscribe) {
      subscribedEndpoint = data.subscribe;
      if (!endpointClients[subscribedEndpoint]) {
        endpointClients[subscribedEndpoint] = [];
      }
      endpointClients[subscribedEndpoint].push(ws);
      console.log(`A client has subscribed to ${subscribedEndpoint}`);
    }
  });

  ws.on('close', () => {
    if (subscribedEndpoint && endpointClients[subscribedEndpoint]) {
      endpointClients[subscribedEndpoint] = endpointClients[subscribedEndpoint].filter(client => client !== ws);
      console.log(`Client unsubscribed from ${subscribedEndpoint}`);
    }
  });
});