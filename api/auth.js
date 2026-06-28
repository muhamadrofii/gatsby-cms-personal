export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;
  
  if (!client_id) {
    res.status(500).send("Missing GITHUB_CLIENT_ID environment variable");
    return;
  }
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}${
    redirect_uri ? `&redirect_uri=${redirect_uri}` : ""
  }&scope=repo,user`;
  
  res.writeHead(302, { Location: authUrl });
  res.end();
}
