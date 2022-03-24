import Head from 'next/head'
import Name from '../components/name'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { zipToState } from '../lib/zip-to-state.js'

export default function Home() {
  const router = useRouter()

  const [optIn, setOptIn] = useState(true)
  const toggleOptIn = () => {
    setOptIn(!optIn)
  }

  const [isCitizen, setCitizen] = useState(false)
  const toggleCitizen = () => {
    setCitizen(!isCitizen)
  }

  const createRegistrant = async (event) => {
    event.preventDefault()

    const zip = event.target.zip.value
    const state = zipToState(zip)
    if (state === undefined) {
      alert("Please enter a valid zip code.")
    } else {
      const birthDate = event.target.birthDate.value
      const [birthYear, birthMonth, birthDateDays] = birthDate.split('-')
      const formattedBirthDate = birthMonth + '-' + birthDateDays + '-' + birthYear

      const data = {
        lang: 'en',
        partner_id: '1', // #fixme change to real value
        send_confirmation_reminder_emails: false,
        date_of_birth: formattedBirthDate,
        email_address: event.target.email.value,
        home_zip_code: zip,
        us_citizen: isCitizen,
        name_title: event.target.title.value,
        first_name: event.target.firstName.value,
        last_name: event.target.lastName.value,
        name_suffix: event.target.suffix.value,
        opt_in_email: optIn
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      fetch("/api/rtv?path=/api/v4/gregistrations.json", options)

      router.push(`/${state}?zip=${zip}&email=${data.email_address}&optIn=${optIn}&birthDate=${formattedBirthDate}&title=${data.name_title}&firstName=${data.first_name}&lastName=${data.last_name}&suffix=${data.name_suffix}&citizen=${isCitizen}`)
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

      <p>Fill out the form below, and based on your information, we&apos;ll tell you how to register.</p>

      <form onSubmit={createRegistrant}>
        <fieldset>
          <div className="row">
            <div className="col">
              <label htmlFor="citizen">
                <input id="citizen" name="citizen" type="checkbox" onChange={toggleCitizen} required />
                I am a U.S. citizen
              </label>
            </div>
          </div>
          <Name type="" />
          <div className="row">
            <div className="col">
              <label htmlFor="zip">Zip Code</label>
              <input id="zip" name="zip" type="tel" maxLength="5" minLength="5" required />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="birthDate">Date of Birth</label>
              <input id="birthDate" name="birthDate" type="date" required />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="optIn">
                <input id="optIn" name="optIn" type="checkbox" defaultChecked onChange={toggleOptIn} />
                Send me my voting location, how to vote by mail, and other voting info
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="submit">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
