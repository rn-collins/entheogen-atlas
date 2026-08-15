module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!String(req.headers['content-type'] || '').includes('application/json')) return res.status(415).json({ error: 'JSON required' });

  const name = typeof req.body?.name === 'string' ? req.body.name.trim().slice(0, 120) : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().slice(0, 254) : '';
  const message = typeof req.body?.message === 'string' ? req.body.message.trim().slice(0, 3000) : '';
  const consent = req.body?.consent === true;
  if (!consent) return res.status(400).json({ error: 'Consent required' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Valid email required' });

  try {
    const upstream = await fetch('https://rn-api-rn-collins.vercel.app/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, source: 'contact-architect-entheogen-atlas' })
    });
    if (!upstream.ok) return res.status(502).json({ error: 'Inquiry service unavailable' });
    return res.status(200).json({ success: true });
  } catch (_) {
    return res.status(502).json({ error: 'Inquiry service unavailable' });
  }
};
