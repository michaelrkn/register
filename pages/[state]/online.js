import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import states from '../../public/states-info'

export default function Home() {
  const router = useRouter()
  let { state } = router.query
  let ovrRequirements = ""
  let ovrLink = ""

  if (router.isReady) {
    ovrRequirements = states[state].ovrRequirements
    ovrLink = states[state].ovrLink
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote Online in {state}</title>
        <meta name="description" content={`Register to vote online in ${state}`} />
      </Head>

      <h1>Register Online in {state}</h1>

      <p>In {state}, you can register to vote online if you have {ovrRequirements}.</p>

      <p>It will only take a couple minutes. Click the button below.</p>

      <p><a href={`${ovrLink}`} target="_blank" className="button primary">Register To Vote</a></p>

      <p>Don't wait. Register now.</p>

      <p><Link href={`/${state}/paper`}><a>Click here if you'd prefer to register by mail.</a></Link></p>
    </div>
  )
}