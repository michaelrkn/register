import Head from 'next/head'
import Link from 'next/link'
import Address from '../components/address'
import Name from '../components/name'
import { useRouter } from 'next/router'
import statesInfo from '../public/states-info'

export default function Home() {
  const router = useRouter()
  let { state } = router.query

  if (router.isReady) {
    const stateInfo = statesInfo[state];
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote in {state}</title>
        <meta name="description" content="Register to vote in {state}" />
      </Head>
      {router.isReady &&
        <div>
          <h1>Register in {state}</h1>

          {stateInfo.specialCase &&
            <div>
              <p>{stateInfo.specialInstructions}</p>
            </div>
          }

          {stateInfo.ovrAvailable &&
            <div>
              <h2>Online</h2>

              <p>If you have {stateInfo.ovrRequirements}, you can register online with the state.</p>

              {stateInfo.ovrNotes && <p>Click the button below. <strong>{stateInfo.ovrNotes}</strong></p>}

              <p><a href={`${stateInfo.ovrLink}`} target="_blank" rel="noreferrer" className="button primary">Register Online</a></p>
            </div>
          }

          {!stateInfo.specialCase &&
            <div>
              {stateInfo.ovrAvailable
                ? <h2>By Mail</h2>
                : <p>{state} does not have online voter registration, so you must register by mail (or in-person).</p>
              }
              <p>Fill out the form below.</p>
              <p>Either you can print it out, or we can print it and mail it to you.</p>
              <p>Then sign it and mail it in.</p>
              <form>
                <fieldset>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="citizen">
                      {/* the checkbox state isn't properly tracked, fixme pls */}
                        <input id="citizen" name="citizen" type="checkbox" />
                        I am a U.S. citizen
                      </label>
                    </div>
                  </div>
                  <Name />
                  <div className="row">
                    <div className="col">
                      <label htmlFor="previousName">
                      {/* the checkbox state isn't properly tracked, fixme pls */}
                        <input id="previousName" name="previousName" type="checkbox" />
                        I have changed my name
                      </label>
                    </div>
                  </div>
                  <Address type="Home" />
                  <div className="row">
                    <div className="col">
                      <label htmlFor="hasMailingAddress">
                      {/* the checkbox state isn't properly tracked, fixme pls */}
                        <input id="hasMailingAddress" name="hasMailingAddress" type="checkbox" />
                        I get mail at a different address
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="previousRegistration">
                      {/* the checkbox state isn't properly tracked, fixme pls */}
                        <input id="previousRegistration" name="previousRegistration" type="checkbox" />
                        I previously registered at a different address
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="birthDate">Date of Birth</label>
                      <input id="birthDate" name="birthDate" type="date" />
                    </div>
                    <div className="col">
                      <label htmlFor="idNumber">Last 4 of Your Social Security Number</label>
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
                          I don't have a printer. Print the form and mail it to me. Then I will sign and mail it in.
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