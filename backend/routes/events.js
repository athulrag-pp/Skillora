import express from 'express';

const router = express.Router();

// Store active SSE client response objects
let sseClients = [];

// GET /api/events/stream - Server-Sent Events Real-Time Channel
router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  // Send initial connection event
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'Real-time Event Stream Connected', clientId })}\n\n`);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

// Broadcast event helper function
export const broadcastEvent = (eventType, payload) => {
  const data = JSON.stringify({ type: eventType, payload, timestamp: new Date().toISOString() });
  sseClients.forEach(c => {
    try {
      c.res.write(`data: ${data}\n\n`);
    } catch (e) {}
  });
};

export default router;
