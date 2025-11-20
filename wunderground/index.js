module.exports = async function (context, req) {
  context.log('--- Azure Function: Wunderground request received ---');
  context.log('Method:', req.method);

  // Load auth data from environment variable. Expecting a JSON array of objects
  // where each object contains at least `key` and `id` properties, e.g.
  // [{"key":"MYPASS","id":"station1"}, ...]
  let authData = [];
  if (process.env.auth_data) {
    try {
      const parsed = JSON.parse(process.env.auth_data);
      if (Array.isArray(parsed)) {
        authData = parsed;
      } else {
        context.log.warn('auth_data is present but not an array; ignoring');
      }
    } catch (err) {
      context.log.warn('Failed to parse auth_data environment variable:', err.message);
    }
  } else {
    context.log('No auth_data environment variable found; no credentials will be accepted');
  }

  // Query params (GET) and body (POST) support
  const data = Object.keys(req.query || {}).length ? req.query : req.body || {};

  const incomingKey = (data.key || data.KEY || data.pass || data.PASS || '').toString();
  const incomingId = (data.id || data.ID || '').toString();

  context.log('User-Agent:', req.headers && req.headers['user-agent']);
  context.log('Data:', data);

  // Validate auth: require both key and id to be present and match an entry
  if (!incomingKey || !incomingId) {
    context.log('Authentication failed: missing key or id');
    context.res = {
      status: 400,
      body: 'Missing key or id'
    };
    return;
  }

  const authorized = authData.some(entry => {
    try {
      // compare as strings to avoid type mismatches
      return String(entry.key) === incomingKey && String(entry.id) === incomingId;
    } catch (e) {
      return false;
    }
  });

  if (!authorized) {
    context.log('Authentication failed: invalid credentials for id=', incomingId);
    context.res = {
      status: 401,
      body: 'Unauthorized'
    };
    return;
  }

  context.log('Authentication succeeded for id=', incomingId);
  context.log('------------------------------------------------');

  context.res = {
    status: 200,
    body: 'OK'
  };
};
