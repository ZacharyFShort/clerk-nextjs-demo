import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <SignedOut>
        <h1>You are signed out</h1>
        <SignInButton />
        <SignUpButton />
      </SignedOut>

      <SignedIn>
        <h1>You are signed in</h1>
        <UserButton />
      </SignedIn>
    </main>
  )
}



