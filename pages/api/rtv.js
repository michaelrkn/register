export default async (req, res) => {
  const { url } = req.query
  const options = req.method === 'GET' ? {} : {
    method: req.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  }
  try {
    const resProxy = await fetch(url, options)
    res.status(200).send(resProxy.body)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.toString())
  }
};
