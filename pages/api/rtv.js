import { withSentry, captureException } from '@sentry/nextjs';

const handler = async (req, res) => {
  const { path } = req.query
  if (path) {
    const options = req.method === 'GET' ? {} : {
      method: req.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    }
    const url = 'https://register.rockthevote.com' + path
    const response = await fetch(url, options)
    res.status(response.status).send(response.body)
    if (!response.ok) {
      try {
        const body = await response.text()
        throw new Error("Rock The Vote returned HTTP error code " + response.status + ": " + body)
      } catch(e) {
        captureException(e)
      }
    }
  } else {
    res.status(400).send("Invalid path: " + path)
  }
}

export default withSentry(handler);
