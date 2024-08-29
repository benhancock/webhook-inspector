const express = require('express');
const path = require('path');

const {
  createEndpoint,
  deleteEvents,
  getEndpoint,
  deleteEndpoint,
  deleteEvent,
} = require('./eventController');
const router = express.Router();

router.post('/api/url_endpoints', createEndpoint);
router.get('/api/url_endpoints/:url_endpoint', getEndpoint);
router.delete('/api/events/:url_endpoint', deleteEvents);
router.delete('/api/url_endpoints/:url_endpoint', deleteEndpoint);
router.delete('/api/event/:event_string', deleteEvent);


router.use(express.static(path.join(__dirname, '..', '..', 'RequestBinFE', 'dist')));


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'RequestBinFE', 'dist', 'index.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'RequestBinFE', 'dist', 'index.html'));
});

module.exports = router;