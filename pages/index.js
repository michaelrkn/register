import Head from 'next/head'
import Name from '../components/name'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { zipToState } from '../lib/zip-to-state.js'

export default function Home() {
  const router = useRouter()
  const { partnerId, source, hideHeader } = router.query

  const hideHeaderValue = hideHeader ? JSON.parse(hideHeader) : false

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
        partner_id: partnerId || '1',
        send_confirmation_reminder_emails: true,
        date_of_birth: formattedBirthDate,
        email_address: event.target.email.value,
        home_zip_code: zip,
        us_citizen: isCitizen,
        name_title: event.target.title.value,
        first_name: event.target.firstName.value,
        last_name: event.target.lastName.value,
        name_suffix: event.target.suffix.value,
        opt_in_email: optIn,
        source_tracking_id: source
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      fetch("/api/rtv?path=/api/v4/gregistrations.json", options)

      const userQueryParams = `zip=${zip}&email=${data.email_address}&optIn=${optIn}&birthDate=${birthDate}&title=${data.name_title}&firstName=${data.first_name}&lastName=${data.last_name}&suffix=${data.name_suffix}&citizen=${isCitizen}`
      const queryParamsWithPartner = partnerId ? userQueryParamsWithPartner + `&partnerId=${partnerId}` : userQueryParams
      const queryParamsWithSource = source ? queryParamsWithPartner + `&source=${source}` : queryParamsWithPartner
      router.push(`/s/${state}?` + queryParamsWithSource)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote</title>
        <meta name="description" content="Register to vote" />
      </Head>

      {!hideHeaderValue &&
        <h1>Register To Vote</h1>
      }
      <div className="row">
        <div className="col card">
          <p>
            <span className="icon">
              <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                  <title>Pencil</title>
                </path>
              </svg>
            </span>
            Fill out the form below. Based on your info, we&apos;ll tell you how to register.
          </p>
        </div>
        <div className="col card">
          <p>
          <span className="icon">
            <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M768 1664h896v-640h-416q-40 0-68-28t-28-68v-416h-384v1152zm256-1440v-64q0-13-9.5-22.5t-22.5-9.5h-704q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h704q13 0 22.5-9.5t9.5-22.5zm256 672h299l-299-299v299zm512 128v672q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-544q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h1088q40 0 68 28t28 68v328q21 13 36 28l408 408q28 28 48 76t20 88z">
                <title>Paper on clipboard</title>
              </path>
            </svg>
          </span>
            You need to register before voting and if you move.
          </p>
        </div>
        <div className="col card">
          <p>
            <span className="icon">
              <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
                  <title>Question mark</title>
                </path>
              </svg>
            </span>
            Not sure if you&apos;re registered? There&apos;s no harm in re-registering.
          </p>
        </div>
      </div>
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
              <button type="submit">Tell me how to register</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
