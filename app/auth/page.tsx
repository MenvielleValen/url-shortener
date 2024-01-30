import { SignInButtonWithProvider } from '@/components/SignInButtonWithProvider'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../utils/auth'
import { redirect } from 'next/navigation';

export default async function AuthPage() {

    const session = await getServerSession(authOptions);

    if(session){
        redirect('/');
    }


  return (
    <section className='md:1/4 mx-auto flex flex-col gap-3 h-[100vh] items-center justify-center'>
        <SignInButtonWithProvider provider='github'/>
        <SignInButtonWithProvider provider='gitlab'/>
    </section>
  )
}
