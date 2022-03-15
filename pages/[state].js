import Head from 'next/head'
import Link from 'next/link'
import Address from '../components/address'
import Name from '../components/name'
import { useRouter } from 'next/router'
import { useState } from 'react'
import statesInfo from '../public/states-info'

export default function Home() {
  const router = useRouter()
  let { state, zip } = router.query

  const [nameChanged, setNameChanged] = useState(false)
  const toggleNameChanged = () => {
    setNameChanged(!nameChanged)
  }

  const warnIfMinor = (event) => {
    const age = calculateAge(event.target.value)
    if (age < 18) {
      alert("In " + state + ", you can register to vote " + stateInfo.sub_18_msg + ".")
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

  let stateInfo = {}
  if (router.isReady) {
    stateInfo = statesInfo[state];
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote in {state}</title>
        <meta name="description" content="Register to vote in {state}" />
      </Head>
      {router.isReady &&
        <div>
          {stateInfo.specialCase &&
            <div>
              <h1>Register in {state}</h1>
              <p>{stateInfo.specialInstructions}</p>
            </div>
          }

          {stateInfo.ovrAvailable &&
            <div>
              <h1>Register Online</h1>

              {stateInfo.ovrRequirements
                ? <p>If you have {stateInfo.ovrRequirements}, you can register online with the state.</p>
                : <p>Any {state} resident can register to vote online.</p>
              }

              {stateInfo.ovrNotes && <p>Click the button below. <strong>{stateInfo.ovrNotes}</strong></p>}

              <p><a href={`${stateInfo.ovrLink}`} target="_blank" rel="noreferrer" className="button primary">Register Online</a></p>
            </div>
          }

          {!stateInfo.specialCase &&
            <div>
              <h1>Register By Mail</h1>
              {!stateInfo.ovrAvailable &&
                <p>{state} does not have online voter registration, so you must register by mail (or in person).</p>
              }
              <ol>
                <li>Fill out the form below.</li>
                <li>Either you can print it, or we can print it and mail it to you.</li>
                <li>Sign it and mail it in.</li>
              </ol>
              <form>
                <fieldset>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="citizen">
                        <input id="citizen" name="citizen" type="checkbox" />
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
                  {nameChanged && <Name type="Previous" />}
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
                  <div className="row">
                    <div className="col">
                      <label htmlFor="birthDate">Date of Birth</label>
                      <input id="birthDate" name="birthDate" type="date" onBlur={warnIfMinor} />
                    </div>
                    <div className="col">
                      <label htmlFor="idNumber">Last 4 of Social Security #</label>
                      <input id="idNumber" name="idNumber" type="text" />
                    </div>
                  </div>
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