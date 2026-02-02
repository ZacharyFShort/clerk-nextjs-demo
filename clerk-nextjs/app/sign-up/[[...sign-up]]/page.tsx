'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      paddingTop: '20px',
      paddingBottom: '20px'
    }}>
      <SignUp />
    </div>
  )
}
