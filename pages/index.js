import Head from 'next/head'

export default function Home() {
  return (
    <div class="container">
      <Head>
        <title>Register to Vote</title>
        <meta name="description" content="Register to vote" />
      </Head>

      <h1>Register to Vote</h1>

      <p>You need to register before you can vote. You need to register again if you've moved.</p>

      <p>Don't worry if you don't know if you're registered. There's no harm in registering twice.</p>

      <p>Fill out the form below, and based on your location, we'll tell you how to register.</p>

      <form>
        <fieldset>
          <p>
            <label for="name">Full Legal Name</label>
            <input id="name" name="name" type="text" />
          </p>

          <p>
            <label for="zip">Zip Code</label>
            <input id="zip" name="zip" type="tel" />
          </p>

          <p>
            <label for="cell">Cell Phone</label>
            <input id="cell" name="cell" type="tel" />
          </p>

          <p>
            <label for="opt-in">
              <input id="opt-in" name="opt-in" type="checkbox" checked />
              Text me my voting location, how to vote by mail, and other voting info.
            </label>
          </p>

          <p><button type="submit">Submit</button></p>
        </fieldset>
      </form>
    </div>
  )
}
