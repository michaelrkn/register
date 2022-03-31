import { withSentry, captureException } from '@sentry/nextjs';

const fetchRtv = async (req, path) => {
  const options = req.method === 'GET' ? {} : {
    method: req.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  }
  const url = 'https://register.rockthevote.com' + path
  return await fetch(url, options)
}

const sendErrorToSentry = async (response) => {
  const bodyText = await response.text()
  try {
    throw new Error("Rock The Vote returned HTTP error code " + response.status + ": " + bodyText)
  } catch(e) {
    captureException(e)
  }
}

const handler = async (req, res) => {
  const { path } = req.query
  if (path) {
    const response = await fetchRtv(req, path)
    if (!response.ok) {
      sendErrorToSentry(response)
    }
    res.status(response.status).send(response.body)
  } else {
    res.status(400).send("Invalid path: " + path)
  }
}

export default withSentry(handler);
