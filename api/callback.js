export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("No authorization code provided");
    return;
  }

  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    res.status(500).send("Missing environment variables GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET");
    return;
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      res.status(400).send(data.error_description || data.error);
      return;
    }

    const token = data.access_token;

    // Send postMessage to the parent window that opened the popup
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Authorizing...</title>
      </head>
      <body>
        <p>Authorizing, please wait...</p>
        <script>
          const token = "${token}";
          const provider = "github";
          
          function post(message) {
            window.opener.postMessage(message, "*");
          }
          
          if (token) {
            post("authorization:github:success:" + JSON.stringify({ token, provider }));
            post("authorizing:github:success:" + JSON.stringify({ token, provider }));
          } else {
            post("authorization:github:error:Missing token");
            post("authorizing:github:error:Missing token");
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication failed");
  }
}
