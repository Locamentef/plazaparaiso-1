// Netlify Function: proxy seguro para la API Channel Manager de Fourvenues.
// Expone GET /.netlify/functions/fourvenues-events
// Devuelve array de { id, slug, name, date, organizationSlug } para todos los
// eventos a los que tiene acceso la API key de Locamente.

exports.handler = async (event, context) => {
  const API_KEY = process.env.FOURVENUES_API_KEY;
  const BASE    = 'https://channels-service-alpha.fourvenues.com';

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'FOURVENUES_API_KEY not configured' }),
    };
  }

  try {
    // 1. Obtener todos los eventos
    const res = await fetch(`${BASE}/events`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Fourvenues error ${res.status}`, detail: text }),
      };
    }

    const data = await res.json();

    // 2. Normalizar: extraer solo los campos que necesita el front-end
    // La respuesta puede venir como { data: [...] } o directamente como array
    const raw = Array.isArray(data) ? data : (data.data || data.events || []);

    const events = raw.map(ev => ({
      id:               ev.id,
      slug:             ev.slug,
      name:             ev.name,
      date:             ev.date || ev.start_date || null,
      organizationSlug: ev.organization?.slug || ev.organizationSlug || null,
      organizationId:   ev.organization?.id   || ev.organizationId   || null,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type':  'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ events }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
