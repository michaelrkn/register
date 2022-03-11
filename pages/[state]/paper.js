import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import states from '../../public/states-info'

export default function Home() {
  const router = useRouter()
  let { state } = router.query
  let ovrRequirements = ""

  if (router.isReady) {
    ovrRequirements = states[state].ovrRequirements
  }

  return (
    <div className="container">
      <Head>
        <title>Register by Mail to Vote in {state}</title>
        <meta name="description" content={`Register by mail to vote in ${state}`} />
      </Head>

      <h1>Register by Mail in {state}</h1>

      <p>You'll need to print, sign, and mail your voter registration form.</p>

      <p>[add actual system to do this]</p>

      <p>Don't wait. Register now.</p>

      <p><Link href={`/${state}/online`}><a>Or, if you have {ovrRequirements}, click here to register online.</a></Link></p>
    </div>
  )
}