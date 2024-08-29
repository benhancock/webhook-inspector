const Event = require('./event');
const { pool, mongoConnection } = require('./db');
const crypto = require('crypto');

const createEndpoint = async (req, res) => {
  try {
    // generate a random URL endpoint
    const url_endpoint = crypto.randomUUID();

    // insert the URL endpoint into PostgreSQL with early exit if operation fails
    const query = `
    INSERT INTO url_endpoints (user_id, endpoint)
    VALUES ($1, $2)
    `;
    const postgresResult = await pool.query(query, [
      req.body.user_id,
      url_endpoint,
    ]);
    if (postgresResult.rowCount === 0) {
      throw new Error('Unable to create endpoint');
    }

    // success message if both operations are successful
    res.json({ user_id: req.body.user_id, url_endpoint });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEndpoint = async (req, res) => {
  console.log('hi')
  try {
    const url_endpoint = req.params.url_endpoint;
    let mongoEvents = await Event.find({ endpointString: url_endpoint });
    mongoEvents = mongoEvents.map((eventObj) => {
      return { timestamp: eventObj.timestamp, contents: eventObj.contents };
    });
    res.json(mongoEvents);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteEvents = async (req, res) => {
  try {
    // delete events from MongoDB with early exit if not found
    let mongoEvents = await Event.deleteMany({
      endpointString: req.params.url_endpoint,
    });
    if (mongoEvents.deletedCount === 0) {
      throw new Error('Unable to delete document. Document not found');
    }

    // delete events from PostgreSQL with early exit if not found
    const query = `
      DELETE FROM events
      USING url_endpoints
      WHERE events.url_endpoints_id = url_endpoints.id
      AND url_endpoints.endpoint = TRIM($1);
    `;
    const postgresResult = await pool.query(query, [req.params.url_endpoint]);
    if (postgresResult.rowCount === 0) {
      throw new Error('Unable to delete events. No rows found.');
    }

    // return success message if both deletions were successful
    res.json({
      success: `Events for endpoint ${req.params.url_endpoint} deleted`,
    });
  } catch (error) {
    res
      .status(500)
      .send(
        `Error deleting events for endpoint ${req.params.url_endpoint}`,
        error
      );
  }
};

const deleteEndpoint = async (req, res) => {
  // this method currently doesn't have a use case
  try {
    let mongoEvents = await Event.deleteMany({
      url_endpoint: req.params.url_endpoint,
    });
    if (mongoEvents.deletedCount === 0) {
      throw new Error('Unable to delete document. Document not found');
    }

    const query = `
    DELETE FROM url_endpoints
    WHERE endpoint = TRIM($1);
    `;
    const postgresResult = await pool.query(query, [req.params.url_endpoint]);
    if (postgresResult.rowCount === 0) {
      throw new Error('Unable to delete endpoint. Row not found.');
    }

    res.json({ success: `Endpoint ${req.params.url_endpoint} deleted` });
  } catch (error) {
    res
      .status(500)
      .send(`Error deleting endpoint ${req.params.url_endpoint}: ${error}`);
  }
};

const deleteEvent = async (req, res) => {
  try {
    // regex to match timestamp and url_endpoint in either order, with exit early for missing parameters
    regex =
      /(?:timestamp=)(\d+)(?:&url_endpoint=)([\w-]+)|(?:url_endpoint=)([\w-]+)(?:&timestamp=)(\d+)/;
    if (!regex.test(req.params.event_string)) {
      throw new Error('One or more delete parameters are missing or incorrect');
    }
    const [timestamp, url_endpoint] = req.params.event_string
      .match(regex)
      .slice(1);

    // delete event from MongoDB with early exit if not found
    let mongoResult = await Event.deleteOne({
      timestamp: timestamp,
      endpointString: url_endpoint,
    });
    if (mongoResult.deletedCount === 0) {
      throw new Error('Unable to delete document. Document not found');
    }

    // delete event from PostgreSQL with early exit if not found
    const query = `
      DELETE FROM events
      WHERE time_received = $1
      AND url_endpoints_id = (
          SELECT id
          FROM url_endpoints
          WHERE endpoint = $2
      );
    `;
    let postgresResult = await pool.query(query, [timestamp, url_endpoint]);
    if (postgresResult.rowCount === 0) {
      throw new Error('Unable to delete event. Row not found.');
    }

    // return success message if both deletions were successful
    res.json({
      success: `Event for ${url_endpoint} at ${new Date(
        timestamp * 1000
      ).toLocaleString()} deleted`,
    });
  } catch (error) {
    res.status(500).send(`Error deleting event: ${error}`);
  }
};

module.exports = {
  createEndpoint,
  deleteEvents,
  getEndpoint,
  deleteEndpoint,
  deleteEvent,
};
