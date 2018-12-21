require('now-env')
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const API_ENDPOINT = 'https://www.eventbriteapi.com/v3';

module.exports = async (req, res) => {
  if (/favicon\.ico/.test(req.url)) {
    return;
  }

  const eventId = getEventIdFromUrl(req.url);
  res.setHeader('content-type', 'application/json');

  if (!eventId) {
    res.status = 500;
    res.end(JSON.stringify({ error: 'A valid eventUrl is required.' }));
    return;
  };

  const attendance = await getEventAttendance(eventId);

  res.end(JSON.stringify(attendance));
  return;
};

async function getEventAttendance(eventId) {
  try {
    const response = await fetch(`${API_ENDPOINT}/events/${eventId}/ticket_classes?token=${process.env.EVENTBRITE_OAUTH_TOKEN}`);
    const { ticket_classes: ticketClasses } = await response.json();

    return getTotalAttendanceFromTicketClasses(ticketClasses);
  } catch (e) {
    return {
      error: e.message
    }
  }
}

function getEventIdFromUrl(url) {
  const params = new URLSearchParams(url.slice(1));

  if (!params.has('eventUrl')) {
    return false;
  }

  const eventId = params.get('eventUrl').split('-').pop();

  return parseInt(eventId) || false;
}

function getTotalAttendanceFromTicketClasses(ticketClasses) {
  return ticketClasses.reduce((totals, ticket) => {
    totals.sold += ticket.quantity_sold;
    totals.total += ticket.quantity_total;
    return totals;
  }, { sold: 0, total: 0 });
}
