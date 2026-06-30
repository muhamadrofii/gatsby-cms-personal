export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;

  if (!client_id) {
    res.status(500).send("Missing GITHUB_CLIENT_ID environment variable");
    return;
  }

  // Auto-detect redirect URI from request (no env needed)
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const redirect_uri = `${protocol}://${host}/api/callback`;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo,user`;

  res.writeHead(302, { Location: authUrl });
  res.end();
}

