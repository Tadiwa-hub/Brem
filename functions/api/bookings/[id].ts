import { Env } from '../availability';

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const HARDCODED_PASSWORD = "Brem2026";
  const authHeader = context.request.headers.get('Authorization');
  if (authHeader !== HARDCODED_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const id = context.params.id as string;
  
  try {
    const { status } = await context.request.json() as { status: string };

    await context.env.DB.prepare(
      "UPDATE brem_bookings SET status = ? WHERE id = ?"
    ).bind(status, id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
