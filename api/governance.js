const crypto = require('crypto');

const buckets = new Map();

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!String(req.headers['content-type'] || '').includes('application/json')) return res.status(415).json({ error: 'JSON required' });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const recent = (buckets.get(ip) || []).filter(t => now - t < 60 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ error: 'Request limit reached. Try again later.' });
  recent.push(now); buckets.set(ip, recent);

  const clean = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
  const requestType = clean(req.body?.requestType, 80);
  const claimId = clean(req.body?.claimId, 160);
  const name = clean(req.body?.name, 120);
  const email = clean(req.body?.email, 254);
  const message = clean(req.body?.message, 5000);
  if (req.body?.consent !== true) return res.status(400).json({ error: 'Consent required' });
  if (!requestType || !claimId || !name || !message) return res.status(400).json({ error: 'All request fields are required' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Valid email required' });

  const reference = 'EA-' + crypto.randomBytes(6).toString('hex').toUpperCase();
  try {
    const upstream = await fetch('https://rn-api-rn-collins.vercel.app/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email,
        message: `Governance request ${reference}\nType: ${requestType}\nClaim/section: ${claimId}\n\n${message}`,
        source: 'governance-entheogen-atlas'
      })
    });
    if (!upstream.ok) return res.status(502).json({ error: 'Governance service unavailable' });
    return res.status(200).json({ success: true, reference });
  } catch (_) {
    return res.status(502).json({ error: 'Governance service unavailable' });
  }
};
