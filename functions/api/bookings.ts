import { Env } from './availability';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const HARDCODED_PASSWORD = "Brem2026";
  const authHeader = context.request.headers.get('Authorization');
  if (authHeader !== HARDCODED_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM brem_bookings ORDER BY created_at DESC"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.json() as {
      client_name: string,
      client_phone: string,
      stay_type: string,
      preferred_date: string,
      num_guests: number,
      special_requests?: string
    };

    const id = crypto.randomUUID();

    await context.env.DB.prepare(
      "INSERT INTO brem_bookings (id, client_name, client_phone, stay_type, preferred_date, num_guests, special_requests, status) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      id,
      data.client_name,
      data.client_phone,
      data.stay_type,
      data.preferred_date,
      data.num_guests,
      data.special_requests || null,
      'pending'
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
