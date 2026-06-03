import { Env } from './availability';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { password } = await context.request.json() as { password: string };
    const HARDCODED_PASSWORD = "Brem2026";

    if (password === HARDCODED_PASSWORD) {
      // In a real app, you'd issue a token here. 
      // For this prototype, we'll return success and the frontend will store the "token" (which is just the password)
      return new Response(JSON.stringify({ success: true, token: HARDCODED_PASSWORD }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
