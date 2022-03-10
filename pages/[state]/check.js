import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import states from '../../public/states-info'

export default function Home() {
  const router = useRouter()
  let { state } = router.query
  let ovrRequirements = ""

  if (router.isReady) {
    const ovrAvailable = states[state].ovrAvailable
    ovrRequirements = states[state].ovrRequirements
    if (!ovrAvailable) {
      router.push("/" + state + "/paper")
    } else if (ovrRequirements === "") {
      router.push("/" + state + "/online")
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Register to Vote in {state}</title>
        <meta name="description" content="Register to vote in {state}" />
      </Head>

      <h1>Register to Vote in {state}</h1>

      <p>Do you have {ovrRequirements}?</p>

      <p>
        <Link href={`/${state}/online`}><a className="button primary">Yes</a></Link>
        <Link href={`/${state}/paper`}><a className="button error">No</a></Link>
      </p>
    </div>
  )
}