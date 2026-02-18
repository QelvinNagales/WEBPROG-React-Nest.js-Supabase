import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    // PUT /api/guestbook/:id - Update entry
    if (req.method === 'PUT') {
      const { name, message } = req.body;
      const { data, error } = await supabase
        .from('guestbook')
        .update({ name, message })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return res.status(200).json(data);
    }

    // DELETE /api/guestbook/:id - Delete entry
    if (req.method === 'DELETE') {
      const { data, error } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
