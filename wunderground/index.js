module.exports = async function (context, req) {
  context.log('--- Azure Function: Wunderground request received ---');
  context.log('Method:', req.method);

  // Query params (GET) and body (POST) support
  const data = Object.keys(req.query || {}).length ? req.query : req.body || {};

  context.log('User-Agent:', req.headers && req.headers['user-agent']);
  context.log('Data:', data);
  context.log('------------------------------------------------');

  context.res = {
    status: 200,
    body: 'OK'
  };
};
