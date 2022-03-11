import Head from 'next/head'
import { Router, useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

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

    const zip = parseInt(data.zip, 10)
    if (isNaN(zip) || zip < 501 || zip > 99950) {
      alert("Invalid zip code")
    } else {
      let state

      if (zip >= 35000 && zip <= 36999) {
        state = "Alabama"
      } else if (zip >= 99500 && zip <= 99999) {
        state = "Alaska"
      } else if (zip >= 85000 && zip <= 86999) {
        state = "Arizona"
      } else if (zip >= 71600 && zip <= 72999) {
        state = "Arkansas"
      } else if (zip >= 90000 && zip <= 96699) {
        state = "California"
      } else if (zip >= 80000 && zip <= 81999) {
        state = "Colorado"
      } else if ((zip >= 6000 && zip <= 6389) || (zip >= 6391 && zip <= 6999)) {
        state = "Connecticut"
      } else if (zip >= 19700 && zip <= 19999) {
        state = "Delaware"
      } else if (zip >= 32000 && zip <= 34999) {
        state = "Florida"
      } else if ( (zip >= 30000 && zip <= 31999) || (zip >= 39800 && zip <= 39999) ) {
        state = "Georgia"
      } else if (zip >= 96700 && zip <= 96999) {
        state = "Hawaii"
      } else if (zip >= 83200 && zip <= 83999) {
        state = "Idaho"
      } else if (zip >= 60000 && zip <= 62999) {
        state = "Illinois"
      } else if (zip >= 46000 && zip <= 47999) {
        state = "Indiana"
      } else if (zip >= 50000 && zip <= 52999) {
        state = "Iowa"
      } else if (zip >= 66000 && zip <= 67999) {
        state = "Kansas"
      } else if (zip >= 40000 && zip <= 42999) {
        state = "Kentucky"
      } else if (zip >= 70000 && zip <= 71599) {
        state = "Louisiana"
      } else if (zip >= 3900 && zip <= 4999) {
        state = "Maine"
      } else if (zip >= 20600 && zip <= 21999) {
        state = "Maryland"
      } else if ( (zip >= 1000 && zip <= 2799) || (zip == 5501) || (zip == 5544 ) ) {
        state = "Massachusetts"
      } else if (zip >= 48000 && zip <= 49999) {
        state = "Michigan"
      } else if (zip >= 55000 && zip <= 56899) {
        state = "Minnesota"
      } else if (zip >= 38600 && zip <= 39999) {
        state = "Mississippi"
      } else if (zip >= 63000 && zip <= 65999) {
        state = "Missouri"
      } else if (zip >= 59000 && zip <= 59999) {
        state = "Montana"
      } else if (zip >= 27000 && zip <= 28999) {
        state = "North Carolina"
      } else if (zip >= 58000 && zip <= 58999) {
        state = "North Dakota"
      } else if (zip >= 68000 && zip <= 69999) {
        state = "Nebraska"
      } else if (zip >= 88900 && zip <= 89999) {
        state = "Nevada"
      } else if (zip >= 3000 && zip <= 3899) {
        state = "New Hampshire"
      } else if (zip >= 7000 && zip <= 8999) {
        state = "New Jersey"
      } else if (zip >= 87000 && zip <= 88499) {
        state = "New Mexico"
      } else if ( (zip >= 10000 && zip <= 14999) || (zip == 6390) || (zip == 501) || (zip == 544) ) {
        state = "New York"
      } else if (zip >= 43000 && zip <= 45999) {
        state = "Ohio"
      } else if ((zip >= 73000 && zip <= 73199) || (zip >= 73400 && zip <= 74999) ) {
        state = "Oklahoma"
      } else if (zip >= 97000 && zip <= 97999) {
        state = "Oregon"
      } else if (zip >= 15000 && zip <= 19699) {
        state = "Pennsylvania"
      } else if (zip >= 300 && zip <= 999) {
        state = "Puerto Rico"
      } else if (zip >= 2800 && zip <= 2999) {
        state = "Rhode Island"
      } else if (zip >= 29000 && zip <= 29999) {
        state = "South Carolina"
      } else if (zip >= 57000 && zip <= 57999) {
        state = "South Dakota"
      } else if (zip >= 37000 && zip <= 38599) {
        state = "Tennessee"
      } else if ( (zip >= 75000 && zip <= 79999) || (zip >= 73301 && zip <= 73399) ||  (zip >= 88500 && zip <= 88599) ) {
        state = "Texas"
      } else if (zip >= 84000 && zip <= 84999) {
        state = "Utah"
      } else if (zip >= 5000 && zip <= 5999) {
        state = "Vermont"
      } else if ( (zip >= 20100 && zip <= 20199) || (zip >= 22000 && zip <= 24699) || (zip == 20598) ) {
        state = "Virginia"
      } else if ( (zip >= 20000 && zip <= 20099) || (zip >= 20200 && zip <= 20599) || (zip >= 56900 && zip <= 56999) ) {
        state = "Washington DC"
      } else if (zip >= 98000 && zip <= 99499) {
        state = "Washington"
      } else if (zip >= 24700 && zip <= 26999) {
        state = "West Virginia"
      } else if (zip >= 53000 && zip <= 54999) {
        state = "Wisconsin"
      } else if (zip >= 82000 && zip <= 83199) {
        state = "Wyoming"
      }

      router.push("/" + state)
    }
  }
  return (
    <div className="container">
      <Head>
        <title>Register to Vote</title>
        <meta name="description" content="Register to vote" />
      </Head>

      <h1>Register to Vote</h1>

      <p>You need to register before you can vote. You need to register again if you&apos;ve moved.</p>

      <p>If you&apos;re not sure you&apos;re registered, there&apos;s no harm in re-registering.</p>

      <p>Fill out the form below, and based on your location, we&apos;ll tell you how to register.</p>

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
