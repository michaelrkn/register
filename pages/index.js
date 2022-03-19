import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { zipToState } from '../lib/zip-to-state.js'

export default function Home() {
  const router = useRouter()

  const [optIn, setOptIn] = useState(true)
  const toggleOptIn = () => {
    setOptIn(!optIn)
  }

  const createRegistrant = async (event) => {
    event.preventDefault()

    const zip = event.target.zip.value
    const state = zipToState(zip)
    if (state === undefined) {
      alert("Please enter a valid zip code.")
    } else {
      const randomEmail = (Math.random() + 1).toString(36).substring(7) + '@example.com'
      const data = {
        lang: 'en',
        partner_id: '1', // #fixme change to real value
        send_confirmation_reminder_emails: false,
        date_of_birth: '01-01-2000',
        email_address: randomEmail,
        home_zip_code: zip,
        us_citizen: true,
        name_title: 'Ms.',
        first_name: event.target.name.value.split(' ')[0],
        last_name: event.target.name.value.split(' ').pop(),
        phone: event.target.cell.value,
        phone_type: 'Mobile',
        opt_in_sms: optIn
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      fetch("/api/rtv?path=/api/v4/gregistrations.json", options)

      router.push("/" + state + "?zip=" + zip)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote</title>
        <meta name="description" content="Register to vote" />
      </Head>

      <p>You need to register before you can vote. You need to register again if you&apos;ve moved.</p>

      <p>If you&apos;re not sure you&apos;re registered, there&apos;s no harm in re-registering.</p>

      <p>Fill out the form below, and based on your location, we&apos;ll tell you how to register.</p>

      <form onSubmit={createRegistrant}>
        <fieldset>
          <p>
            <label htmlFor="name">Full Legal Name</label>
            <input id="name" name="name" type="text" required />
          </p>

          <p>
            <label htmlFor="zip">Zip Code</label>
            <input id="zip" name="zip" type="tel" maxLength="5" minLength="5" required />
          </p>

          <p>
            <label htmlFor="cell">Cell Phone (numbers only)</label>
            <input id="cell" name="cell" type="tel" maxLength="10" minLength="10" required />
          </p>

          <p>
            <label htmlFor="optIn">
              <input id="optIn" name="optIn" type="checkbox" defaultChecked onChange={toggleOptIn} />
              Text me my voting location, how to vote by mail, and other voting info
            </label>
          </p>

          <p><button type="submit">Submit</button></p>
        </fieldset>
      </form>
    </div>
  )
}
