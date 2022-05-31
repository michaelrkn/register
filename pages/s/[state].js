import Head from 'next/head'
import Link from 'next/link'
import Address from '../../components/address'
import Name from '../../components/name'
import IdNumber from '../../components/id-number'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { captureException, addBreadcrumb } from '@sentry/nextjs';
import statesOnlineInfo from '../../public/states-online-info'
import statesMailInfo from '../../public/states-mail-info'
import statesPrintingAvailable from '../../public/states-printing-available'
import statesAbbreviationMap from '../../public/states-abbreviation-map'
import { generateTimestamp, calculateAge, formatBirthDate } from '../../lib/time-tools'

export async function getServerSideProps(context) {
  return {
    props: context.params
  }
} // #fixme this is so we can know what state the page is for on the server side but seems like a bad idea

export default function Home(props) {
  const router = useRouter()
  const { state } = props
  const { zip, email, phone, optIn, birthDate, title, firstName, lastName, suffix, citizen, partnerId, source, newIdUx } = router.query
  const optInChoice = optIn ? JSON.parse(optIn) : false

  const stateOnlineInfo = statesOnlineInfo[state]
  const stateMailInfo = statesMailInfo[state]
  const statePrintingAvailable = statesPrintingAvailable[state]
  const isMinor = calculateAge(birthDate) < 18

  const [isCitizen, setCitizen] = useState(true)
  const toggleCitizen = () => {
    setCitizen(!isCitizen)
  }

  const [nameChanged, setNameChanged] = useState(false)
  const toggleNameChanged = () => {
    setNameChanged(!nameChanged)
  }

  const [medium, setMedium] = useState(undefined)
  const chooseMedium = (event) => {
    setMedium(event.target.value)
  }

  const [submitting, setSubmitting] = useState(false)

  const [hasMailingAddress, setMailingAddress] = useState(false)
  const toggleMailingAddress = () => {
    setMailingAddress(!hasMailingAddress)
  }

  const [hasPreviousRegistration, setPreviousRegistration] = useState(false)
  const togglePreviousRegistration = () => {
    setPreviousRegistration(!hasPreviousRegistration)
  }

  const [mailFormShowing, setMailFormShowing] = useState(!stateOnlineInfo.specialCase && !stateOnlineInfo.ovrAvailable)
  const showMailForm = () => {
    setMailFormShowing(true)
  }

  const registerOnline = async() => {
    const basicData = {
      lang: 'en',
      partner_id: partnerId || '1',
      date_of_birth: formatBirthDate(birthDate),
      email_address: email,
      phone: phone,
      home_zip_code: zip,
      us_citizen: isCitizen,
      name_title: title,
      first_name: firstName,
      last_name: lastName,
      name_suffix: suffix,
      opt_in_email: optInChoice,
      source_tracking_id: source
    }
    const contactData = phone ? {
      phone: phone,
      phone_type: 'Mobile',
      opt_in_sms: optInChoice,
      email_address: email,
      opt_in_email: false,
      send_confirmation_reminder_emails: false
    } : {
      email_address: email,
      opt_in_email: optInChoice,
      send_confirmation_reminder_emails: true
    }
    const data = Object.assign(basicData, contactData)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch("/api/rtv?path=/api/v4/gregistrations.json", options)
    window.parent.postMessage('ovrButtonClicked', '*')
  }

  const generateApplication = async(event) => {
    event.preventDefault()
    setSubmitting(true)

    const now = generateTimestamp()

    const basicData = {
      lang: 'en',
      partner_id: partnerId || '1',
      send_confirmation_reminder_emails: medium === 'email',
      created_at: now,
      updated_at: now,
      date_of_birth: formatBirthDate(event.target.birthDate.value),
      id_number: event.target.idNumber.value,
      email_address: event.target.email.value || email,
      first_registration: !hasPreviousRegistration,
      us_citizen: isCitizen,
      has_state_license: false,
      is_eighteen_or_older: calculateAge(birthDate) >= 18,
      name_title: event.target.titleLegal.value,
      first_name: event.target.firstNameLegal.value,
      middle_name: '',
      last_name: event.target.lastNameLegal.value,
      name_suffix: event.target.suffixLegal.value,
      home_address: event.target.homeAddress.value,
      home_unit: event.target.homeUnit.value,
      home_city: event.target.homeCity.value,
      home_state_id: statesAbbreviationMap[event.target.homeState.value],
      home_zip_code: event.target.homeZip.value,
      has_mailing_address: hasMailingAddress,
      race: event.target.race.value,
      party: event.target.party.value,
      phone: phone ? phone : '',
      phone_type: phone ? 'Mobile' : '',
      change_of_name: nameChanged,
      change_of_address: hasPreviousRegistration,
      opt_in_email: optInChoice || medium === 'email',
      opt_in_sms: phone ? optInChoice : false,
      opt_in_volunteer: false,
      partner_opt_in_email: false,
      partner_opt_in_sms: false,
      partner_opt_in_volunteer: false,
      source_tracking_id: source
    }

    const previousNameData = !nameChanged ? {} : {
      prev_name_title: event.target.titlePrevious.value,
      prev_first_name: event.target.firstNamePrevious.value,
      prev_middle_name: '',
      prev_last_name: event.target.lastNamePrevious.value,
      prev_name_suffix: event.target.suffixPrevious.value
    }

    const mailingAddressData = !hasMailingAddress ? {} : {
      mailing_address: event.target.mailingAddress.value,
      mailing_unit: event.target.mailingUnit.value,
      mailing_city: event.target.mailingCity.value,
      mailing_state_id: statesAbbreviationMap[event.target.mailingState.value],
      mailing_zip_code: event.target.mailingZip.value
    }

    const previousAddressData = !hasPreviousRegistration ? {} : {
      prev_address: event.target.previousAddress.value,
      prev_unit: event.target.previousUnit.value,
      prev_city: event.target.previousCity.value,
      prev_state_id: statesAbbreviationMap[event.target.previousState.value],
      prev_zip_code: event.target.previousZip.value
    }

    const data = Object.assign(basicData, previousNameData, mailingAddressData, previousAddressData)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    const url = "/api/rtv?path=/api/v4/registrations.json"
    const response = await fetch(url, options)
    if (response.ok) {
      window.parent.postMessage('mailFormSubmitted', '*')
      if (medium === 'email') {
        alert('Your form is being created and sent to ' + event.target.email.value + '. Please check your email and print, sign, and mail in your form ASAP.')
        setSubmitting(false)
      } else {
        redirectToPdf(response, data)
      }
    } else {
      setSubmitting(false)
      const error = await response.text()
      if (errorMapping[error]) {
        alert(errorMapping[error])
      } else {
        alert(error)
      }
    }
  }

  const errorMapping = {
    '{"field_name":"state_id_number","message":"ID Number is invalid."}': 'The ID number you entered is invalid.',
    '{"field_name":"state_id_number","message":"Numero ng ID ay hindi valid."}': 'The ID number you entered is invalid.',
    '{"field_name":"date_of_birth","message":"Should be MM-DD-YYYY"}': 'Enter your birthdate as YYYY-MM-DD, like 2000-12-03.'
  }

  const redirectToPdf = async (response, data) => {
    const result = await response.json()
    const forSeconds = (seconds) => new Promise(res => setTimeout(res, seconds * 1000))
    await forSeconds(4) // 4 seconds seems to be the minimum time needed to generate
    for (var i = 0; i <= 10; i++) {
      if (i === 10) {
        setSubmitting(false)
        try {
          throw new Error('Waiting too long for RTV PDF')
        } catch(e) {
          addBreadcrumb({
            category: 'fetch',
            message: 'registrations fetch body',
            data: data,
            level: 'info'
          })
          captureException(e)
        }
        alert("Your application is taking longer than usual to prepare. We will email it to you when it's ready.")
      }
      const pdfCheck = await fetch("/api/rtv?path=" + result.pdfurl.replace("https://register.rockthevote.com", ""))
      const pdfCheckResult = await pdfCheck.text()
      const start = pdfCheckResult.indexOf('https://download.register.rockthevote.com/pdfs/')
      const end = pdfCheckResult.indexOf('.pdf')
      const pdfUrl = pdfCheckResult.slice(start, end + 4)
      if (pdfUrl !== '') {
        window.location = pdfUrl
        setSubmitting(false)
        break
      } else {
        await forSeconds(2)
      }
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote in {state}</title>
        <meta name="description" content="Register to vote in {state}" />
      </Head>
      <div>
        {isMinor &&
          <div className="card warn">
            In {state}, you can register to vote {stateMailInfo.sub_18_msg}.
          </div>
        }
        {stateOnlineInfo.specialCase &&
          <div>
            <h1>Register to Vote in {state}</h1>
            <p>{stateOnlineInfo.specialInstructions}</p>
          </div>
        }

        {stateOnlineInfo.ovrAvailable &&
          <div>
            <h1>Finish Registering Online</h1>

            {stateOnlineInfo.ovrRequirements
              ? <p>If you have {stateOnlineInfo.ovrRequirements}, you can finish registering online with the state.</p>
              : <p>As a resident of {state}, you can finish registering online.</p>
            }

            {stateOnlineInfo.ovrNotes && <p>Click the button below. <strong>{stateOnlineInfo.ovrNotes}</strong></p>}

            <p><a href={`${stateOnlineInfo.ovrLink}`} target="_blank" rel="noreferrer" className="button primary" onClick={registerOnline}>Finish Registering Online</a></p>

            {stateOnlineInfo.ovrRequirements
              ? <p>Otherwise, you can print and mail your registration.</p>
              : <p>Or, if you prefer, you can print and mail your registration.</p>
            }

            <p><button className="button secondary" onClick={showMailForm}>Print and Mail Your Registration</button></p>
          </div>
        }

        {mailFormShowing &&
          <div>
            <h1>Print and Mail Your Registration</h1>
            {!stateOnlineInfo.ovrAvailable &&
              <p>{state} does not have online voter registration, so you must print and mail your registration (or register in person).</p>
            }
            <ol>
              <li>Finish filling out the form below.</li>
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
                      <input id="citizen" name="citizen" type="checkbox" onChange={toggleCitizen} checked={isCitizen} required />
                      I am a U.S. citizen
                    </label>
                  </div>
                </div>
                <Address type="Home" state={state} zip={zip} />
                <div className="row">
                  <div className="col">
                    <label htmlFor="hasMailingAddress">
                      <input id="hasMailingAddress" name="hasMailingAddress" type="checkbox" onChange={toggleMailingAddress} />
                      I get mail at a different address
                    </label>
                  </div>
                </div>
                {hasMailingAddress && <Address type="Mailing" state="" zip="" />}
                <div className="row">
                  <div className="col">
                    <label htmlFor="previousRegistration">
                      <input id="previousRegistration" name="previousRegistration" type="checkbox" onChange={togglePreviousRegistration} />
                      I previously registered at a different address
                    </label>
                  </div>
                </div>
                {hasPreviousRegistration && <Address type="Previous" state="" zip="" />}
                <Name type="Legal" title={title} firstName={firstName} lastName={lastName} suffix={suffix} />
                <div className="row">
                  <div className="col">
                    <label htmlFor="previousName">
                      <input id="previousName" name="previousName" type="checkbox" onChange={toggleNameChanged} />
                      I have changed my name
                    </label>
                  </div>
                </div>
                {nameChanged && <Name type="Previous" />}
                <div className="row">
                  <div className="col">
                    <label htmlFor="birthDate">Date of Birth</label>
                    <input id="birthDate" name="birthDate" type="date" defaultValue={birthDate} required />
                  </div>
                </div>

                {newIdUx
                  ? <IdNumber state={state} />
                  : <div>
                      <label>In the space below for ID Number: {stateMailInfo.id_number_msg}</label>
                      <div className="row">
                        <div className="col">
                          <label htmlFor="idNumber">ID Number</label>
                          <input id="idNumber" name="idNumber" type="text" required />
                        </div>
                      </div>
                    </div>
                }

                <div className="row">
                  <div className="col">
                    <label htmlFor="race">Race {!stateMailInfo.requires_race && "(optional but appreciated)"}</label>
                    <select id="race" name="race" required={stateMailInfo.requires_race}>
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
                    <label htmlFor="party">Party {!stateMailInfo.requires_party && "(optional)"}</label>
                    <select id="party" name="party" required={stateMailInfo.requires_party}>
                      <option></option>
                      {stateMailInfo.party_list.map((party, index) => <option key={index} value={party}>{party}</option>)}
                      <option value={stateMailInfo.no_party_msg}>{stateMailInfo.no_party_msg}</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div>
                      <label htmlFor="printNow">
                        <input type="radio" id="printNow" name="formMedium" value="print" onChange={chooseMedium} required />
                        I can print from this device. I will print, sign, and mail my application now.
                      </label>
                    </div>
                    <div>
                      <label htmlFor="receiveByEmail">
                        <input type="radio" id="receiveByEmail" name="formMedium" value="email" onChange={chooseMedium} required />
                        Email me my application. I will print, sign, and mail it ASAP.
                      </label>
                    </div>
                    {statePrintingAvailable &&
                      <div>
                        <label htmlFor="receiveByMail">
                          <input type="radio" id="receiveByMail" name="formMedium" value="mail" onChange={chooseMedium} required />
                          I don&apos;t have a printer. Print the form and mail it to me. Then I will sign and mail it in.
                        </label>
                      </div>
                    }
                  </div>
                </div>
                <div className={medium !== "email" ? "hidden" : ""}>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="email">Email</label>
                      <input type="text" id="email" name="email" defaultValue={phone ? '' : email} required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button type="submit" disabled={submitting}>
                      {!submitting
                        ? <span>Prepare My Application</span>
                        : <span>One moment...</span>
                      }
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        }

        <p><Link href={ partnerId ? '/?partnerId=' + partnerId : '/'}><a>Start over</a></Link></p>
      </div>
    </div>
  )
}