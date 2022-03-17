import Head from 'next/head'
import Link from 'next/link'
import Address from '../components/address'
import Name from '../components/name'
import { useRouter } from 'next/router'
import { useState } from 'react'
import statesOnlineInfo from '../public/states-online-info'
import statesMailInfo from '../public/states-mail-info'
import statesPrintingAvailable from '../public/states-printing-available'
import { generateTimestamp } from '../lib/generate-timestamp'

export default function Home() {
  const router = useRouter()
  let { state, zip } = router.query
  let age

  const [isCitizen, setCitizen] = useState(false)
  const toggleCitizen = () => {
    setCitizen(!isCitizen)
  }

  const [nameChanged, setNameChanged] = useState(false)
  const toggleNameChanged = () => {
    setNameChanged(!nameChanged)
  }

  const warnIfMinor = (event) => {
    age = calculateAge(event.target.value)
    if (age < 18) {
      alert("In " + state + ", you can register to vote " + stateMailInfo.sub_18_msg + ".")
    }
  }

  const calculateAge = (birthDateInput) => {
    const birthDate = new Date(birthDateInput)
    const today = new Date()
    const yearDifference = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return yearDifference - 1
    } else {
      return yearDifference
    }
  }

  const [hasMailingAddress, setMailingAddress] = useState(false)
  const toggleMailingAddress = () => {
    setMailingAddress(!hasMailingAddress)
  }

  const [hasPreviousRegistration, setPreviousRegistration] = useState(false)
  const togglePreviousRegistration = () => {
    setPreviousRegistration(!hasPreviousRegistration)
  }

  let stateOnlineInfo = {}
  let stateMailInfo = {}
  let statePrintingAvailable = {}
  if (router.isReady) {
    stateOnlineInfo = statesOnlineInfo[state]
    stateMailInfo = statesMailInfo[state]
    statePrintingAvailable = statesPrintingAvailable[state]
  }

  const generateApplication = async(event) => {
    event.preventDefault()

    const now = generateTimestamp()
    const birthDate = event.target.birthDate.value
    const [birthYear, birthMonth, birthDateDays] = birthDate.split('-')
    const formattedBirthDate = birthMonth + '-' + birthDateDays + '-' + birthYear

    const data = {
      lang: 'en',
      partner_id: '1',
      send_confirmation_reminder_emails: true,
      created_at: now,
      updated_at: now,
      date_of_birth: formattedBirthDate,
      id_number: event.target.idNumber.value,
      email_address: 'noemail@example.com',
      first_registration: !hasPreviousRegistration,
      us_citizen: isCitizen,
      has_state_license: false,
      is_eighteen_or_older: age >= 18,
      name_title: event.target.title.value,
      first_name: event.target.firstName.value,
      middle_name: '',
      last_name: event.target.lastName.value,
      name_suffix: event.target.suffix.value,
      home_address: event.target.homeAddress.value,
      home_unit: event.target.homeUnit.value,
      home_city: event.target.homeCity.value,
      home_state_id: event.target.homeState.value,
      home_zip_code: event.target.homeZip.value,
      has_mailing_address: hasMailingAddress,
      mailing_address: event.target.mailingAddress.value,
      mailing_unit: event.target.mailingUnit.value,
      mailing_city: event.target.mailingCity.value,
      mailing_state_id: event.target.mailingState.value,
      mailing_zip_code: event.target.mailingZip.value,
      race: event.target.race.value,
      party: event.target.party.value,
      phone: '', // #fixme
      phone_type: '', // #fixme
      change_of_name: nameChanged,
      prev_name_title: event.target.titlePrevious.value,
      prev_first_name: event.target.firstNamePrevious.value,
      prev_middle_name: '',
      prev_last_name: event.target.lastNamePrevious.value,
      prev_name_suffix: event.target.suffixPrevious.value,
      change_of_address: hasPreviousRegistration,
      prev_address: event.target.previousAddress.value,
      prev_unit: event.target.previousUnit.value,
      prev_city: event.target.previousCity.value,
      prev_state_id: event.target.previousState.value,
      prev_zip_code: event.target.previousZip.value,
      opt_in_email: false,
      opt_in_sms: true, // #fixme
      opt_in_volunteer: false,
      partner_opt_in_email: false,
      partner_opt_in_sms: false,
      partner_opt_in_volunteer: false
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    if (process.env.NODE_ENV === "production") {
      fetch("https://register.rockthevote.com/api/v4/registrations.json", options)
    } else {
      const response = await fetch("https://cors-anywhere.herokuapp.com/https://register.rockthevote.com/api/v4/registrations.json", options)
      const result = await response.json()
      console.log(result)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote in {state}</title>
        <meta name="description" content="Register to vote in {state}" />
      </Head>
      {router.isReady &&
        <div>
          {stateOnlineInfo.specialCase &&
            <div>
              <h1>Register in {state}</h1>
              <p>{stateOnlineInfo.specialInstructions}</p>
            </div>
          }

          {stateOnlineInfo.ovrAvailable &&
            <div>
              <h1>Register Online</h1>

              {stateOnlineInfo.ovrRequirements
                ? <p>If you have {stateOnlineInfo.ovrRequirements}, you can register online with the state.</p>
                : <p>Any {state} resident can register to vote online.</p>
              }

              {stateOnlineInfo.ovrNotes && <p>Click the button below. <strong>{stateOnlineInfo.ovrNotes}</strong></p>}

              <p><a href={`${stateOnlineInfo.ovrLink}`} target="_blank" rel="noreferrer" className="button primary">Register Online</a></p>
            </div>
          }

          {!stateOnlineInfo.specialCase &&
            <div>
              <h1>Register By Mail</h1>
              {!stateOnlineInfo.ovrAvailable &&
                <p>{state} does not have online voter registration, so you must register by mail (or in person).</p>
              }
              <ol>
                <li>Fill out the form below.</li>
                {statePrintingAvailable
                  ? <li>Either you can print it, or we can print it and mail it to you.</li>
                  : <li>Print it out.</li>
                }
                <li>Sign it and mail it in.</li>
              </ol>
              <form onSubmit={generateApplication}>
                <fieldset>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="citizen">
                        <input id="citizen" name="citizen" type="checkbox" onChange={toggleCitizen}/>
                        I am a U.S. citizen
                      </label>
                    </div>
                  </div>
                  <Name type="" />
                  <div className="row">
                    <div className="col">
                      <label htmlFor="previousName">
                        <input id="previousName" name="previousName" type="checkbox" onChange={toggleNameChanged} />
                        I have changed my name
                      </label>
                    </div>
                  </div>
                  <div className={!nameChanged && "hidden"}><Name type="Previous" /></div>
                  <Address type="Home" state={state} zip={zip} />
                  <div className="row">
                    <div className="col">
                      <label htmlFor="hasMailingAddress">
                        <input id="hasMailingAddress" name="hasMailingAddress" type="checkbox" onChange={toggleMailingAddress} />
                        I get mail at a different address
                      </label>
                    </div>
                  </div>
                  <div className={!hasMailingAddress && "hidden"}><Address type="Mailing" state="" zip="" /></div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="previousRegistration">
                        <input id="previousRegistration" name="previousRegistration" type="checkbox" onChange={togglePreviousRegistration} />
                        I previously registered at a different address
                      </label>
                    </div>
                  </div>
                  <div className={!hasPreviousRegistration && "hidden"}><Address type="Previous" state="" zip="" /></div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="birthDate">Date of Birth</label>
                      <input id="birthDate" name="birthDate" type="date" onBlur={warnIfMinor} />
                    </div>
                  </div>
                  <label>In the space below for ID Number: {stateMailInfo.id_number_msg}</label>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="idNumber">ID Number</label>
                      <input id="idNumber" name="idNumber" type="text" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="race">Race {!stateMailInfo.requires_race && "(optional but appreciated)"}</label>
                      <select id="race" name="race">
                        <option></option>
                        <option value="Asian">Asian</option>
                        <option value="Black or African American">Black or African American</option>
                        <option value="Hispanic or Latino">Hispanic or Latino</option>
                        <option value="Native American or Alaskan Native">Native American or Alaskan Native</option>
                        <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                        <option value="Other">Other</option>
                        <option value="Two or More Races">Two or More Races</option>
                        <option value="White">White</option>
                        <option value="Decline to State">Decline to State</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="party">Party</label>
                      <select id="party" name="party">
                        <option></option>
                        {stateMailInfo.party_list.map((party, index) => <option key={index} value={party}>{party}</option>)}
                        <option value={stateMailInfo.no_party_msg}>{stateMailInfo.no_party_msg}</option>
                      </select>
                    </div>
                  </div>
                  {statePrintingAvailable &&
                    <div className="row">
                      <div className="col">
                        <div>
                          <label htmlFor="receiveByEmail">
                            <input type="radio" id="receiveByEmail" name="formMedium" value="email" />
                            I have access to a printer. I will print, sign, and mail my application.
                          </label>
                        </div>
                        <div>
                          <label htmlFor="receiveByMail">
                            <input type="radio" id="receiveByMail" name="formMedium" value="mail" />
                            I don&apos;t have a printer. Print the form and mail it to me. Then I will sign and mail it in.
                          </label>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="row"><button type="submit">Print My Application</button></div>
                </fieldset>
              </form>
            </div>
          }

          <p><Link href="/"><a>Start over</a></Link></p>
        </div>
      }
    </div>
  )
}