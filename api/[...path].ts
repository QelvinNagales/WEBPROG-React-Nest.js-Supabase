import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  const pathArray = Array.isArray(path) ? path : [path];
  const route = pathArray.join('/');

  try {
    // GET /api/guestbook - Get all entries
    if (req.method === 'GET' && route === 'guestbook') {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return res.status(200).json(data);
    }

    // POST /api/guestbook - Create new entry
    if (req.method === 'POST' && route === 'guestbook') {
      const { name, message } = req.body;
      const { data, error } = await supabase
        .from('guestbook')
        .insert([{ name, message }]);
      
      if (error) throw error;
      return res.status(201).json(data);
    }

    // PUT /api/guestbook/:id - Update entry
    if (req.method === 'PUT' && pathArray[0] === 'guestbook' && pathArray[1]) {
      const id = pathArray[1];
      const { name, message } = req.body;
      const { data, error } = await supabase
        .from('guestbook')
        .update({ name, message })
        .eq('id', id);
      
      if (error) throw error;
      return res.status(200).json(data);
    }

    // DELETE /api/guestbook/:id - Delete entry
    if (req.method === 'DELETE' && pathArray[0] === 'guestbook' && pathArray[1]) {
      const id = pathArray[1];
      const { data, error } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return res.status(200).json(data);
    }

    return res.status(404).json({ error: 'Not Found' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
