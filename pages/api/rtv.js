import { withSentry } from '@sentry/nextjs';

const handler = async (req, res) => {
  const { path } = req.query
  const options = req.method === 'GET' ? {} : {
    method: req.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  }
  try {
    if (path) {
      const url = 'https://register.rockthevote.com' + path
      const resProxy = await fetch(url, options)
      res.status(resProxy.status).send(resProxy.body)
      if (resProxy.status >= 500) {
        throw new Error("Rock The Vote returned HTTP error code " + resProxy.status)
      }
    } else {
      res.status(400).send("Invalid path: " + path)
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error.toString())
  }
}

export default withSentry(handler);
