import Head from 'next/head'
import Link from 'next/link'
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
          <h1>Register to Vote in {state}</h1>

          {stateInfo.specialCase &&
            <div>
              <p>{stateInfo.specialInstructions}</p>
            </div>
          }

          {stateInfo.ovrAvailable &&
            <div>
              <h2>Register Online</h2>

              <p>If you have {stateInfo.ovrRequirements}, you can register online.</p>

              {stateInfo.ovrNotes && <p>Click the button below. <strong>{stateInfo.ovrNotes}</strong></p>}

              <p><a href={`${stateInfo.ovrLink}`} target="_blank" className="button primary">Register Online</a></p>

              <h2>Register by Mail</h2>
            </div>
          }

          {!stateInfo.specialCase &&
            <div>
              <p>[add system for mail registration]</p>
            </div>
          }

          <p><Link href="/"><a>Start over</a></Link></p>
        </div>
      }
    </div>
  )
}