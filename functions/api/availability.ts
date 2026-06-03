export interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { searchParams } = new URL(context.request.url);
  const month = searchParams.get('month'); // Expecting YYYY-MM
  
  if (!month) {
    return new Response(JSON.stringify({ error: 'Month is required' }), { status: 400 });
  }

  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM brem_availability WHERE date LIKE ?"
    ).bind(`${month}%`).all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  // Simple check for admin auth (header for now, or just trust for prototype if no sessions)
  // In a real app, we'd check a JWT or cookie
  const authHeader = context.request.headers.get('Authorization');
  if (authHeader !== context.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { date, status, note } = await context.request.json() as { date: string, status: string, note?: string };

    await context.env.DB.prepare(
      "INSERT INTO brem_availability (date, status, note, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP) " +
      "ON CONFLICT(date) DO UPDATE SET status = excluded.status, note = excluded.note, updated_at = CURRENT_TIMESTAMP"
    ).bind(date, status, note || null).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
