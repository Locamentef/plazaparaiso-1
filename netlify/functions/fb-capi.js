// Netlify Function: proxy seguro para Meta Conversions API (server-side).
// Expone POST /.netlify/functions/fb-capi
// El access token vive SOLO como variable de entorno en Netlify
// (FB_CAPI_ACCESS_TOKEN) — nunca se expone en el HTML/JS del cliente.
//
// Body esperado (JSON):
// {
//   "event_name": "Purchase" | "InitiateCheckout" | "Lead" | ...,
//   "event_time": 1699999999,          // opcional, epoch seconds (default: ahora)
//   "event_source_url": "https://...", // opcional
//   "action_source": "website",        // opcional (default: "website")
//   "user_data": { "client_ip_address": "...", "client_user_agent": "...", "fbp": "...", "fbc": "..." },
//   "custom_data": { "currency": "EUR", "value": 12.0, "content_name": "..." }
// }

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const ACCESS_TOKEN = process.env.FB_CAPI_ACCESS_TOKEN;
  const PIXEL_ID = process.env.META_PIXEL_ID || '1715018873258485';

  if (!ACCESS_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'FB_CAPI_ACCESS_TOKEN not configured' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!payload.event_name) {
    return { statusCode: 400, body: JSON.stringify({ error: 'event_name is required' }) };
  }

  const clientIp = event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'];

  const eventData = {
    event_name: payload.event_name,
    event_id: payload.event_id, // debe coincidir con el eventID enviado al Pixel del navegador para deduplicar
    event_time: payload.event_time || Math.floor(Date.now() / 1000),
    event_source_url: payload.event_source_url,
    action_source: payload.action_source || 'website',
    user_data: {
      client_ip_address: clientIp,
      client_user_agent: event.headers['user-agent'],
      ...(payload.user_data || {}),
    },
    custom_data: payload.custom_data || {},
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [eventData] }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: 'Meta CAPI error', detail: result }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
