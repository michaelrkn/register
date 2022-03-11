import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import states from '../public/states-info'

export default function Home() {
  const router = useRouter()
  let { state } = router.query
  let ovrAvailable = false
  let ovrRequirements = ""
  let ovrNotes = ""
  let ovrLink = ""

  if (router.isReady) {
    ovrAvailable = states[state].ovrAvailable
    ovrRequirements = states[state].ovrRequirements
    ovrNotes = states[state].ovrNotes
    ovrLink = states[state].ovrLink
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote in {state}</title>
        <meta name="description" content="Register to vote in {state}" />
      </Head>

      <h1>Register to Vote in {state}</h1>

      {ovrAvailable &&
        <div>
          <h2>Register Online</h2>

          <p>If you have {ovrRequirements}, you can register online.</p>

          {ovrNotes && <p>Click the button below. <strong>{ovrNotes}</strong></p>}

          <p><a href={`${ovrLink}`} target="_blank" className="button primary">Register Online</a></p>

          <h2>Register by Mail</h2>
        </div>
      }

      <p>[add system for mail registration]</p>

      <p><Link href="/"><a>Start over</a></Link></p>
    </div>
  )
}