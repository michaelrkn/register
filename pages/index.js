import Head from 'next/head'

export default function Home() {
  const createRegistrant = async(event) => {
    event.preventDefault()
    const data = {
      name: event.target.name.value,
      zip: event.target.zip.value,
      cell: event.target.cell.value,
      optIn: event.target.optIn.value
    }
    const response = await fetch("/api/registrant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    alert(result.state)
  }
  return (
    <div className="container">
      <Head>
        <title>Register to Vote</title>
        <meta name="description" content="Register to vote" />
      </Head>

      <h1>Register to Vote</h1>

      <p>You need to register before you can vote. You need to register again if you've moved.</p>

      <p>Don't worry if you don't know if you're registered. There's no harm in registering twice.</p>

      <p>Fill out the form below, and based on your location, we'll tell you how to register.</p>

      <form action="/api/registrant" method="POST" onSubmit={createRegistrant}>
        <fieldset>
          <p>
            <label htmlFor="name">Full Legal Name</label>
            <input id="name" name="name" type="text" />
          </p>

          <p>
            <label htmlFor="zip">Zip Code</label>
            <input id="zip" name="zip" type="tel" />
          </p>

          <p>
            <label htmlFor="cell">Cell Phone</label>
            <input id="cell" name="cell" type="tel" />
          </p>

          <p>
            <label htmlFor="optIn">
              {/* the checkbox state isn't properly tracked, fixme pls */}
              <input id="optIn" name="optIn" type="checkbox" defaultChecked />
              Text me my voting location, how to vote by mail, and other voting info
            </label>
          </p>

          <p><button type="submit">Submit</button></p>
        </fieldset>
      </form>
    </div>
  )
}
