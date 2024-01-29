"use client"

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "./Button";

interface SignInButtonWithProviderProps{
    provider: 'github' | 'google' | 'email',
}

export const SignInButtonWithProvider = ({provider}: SignInButtonWithProviderProps) => {

    const providersConfig = {
        github: {
            label: 'Sign in with GitHub',
            icon: <FaGithub/>
        },
        google: {
            label: 'Sign in with Google',
            icon: <FaGoogle/>
        },
        email:{
            label: 'Sign in with Google',
            icon: <FaGoogle/>
        }
    }


  return (
    <Button onClick={()=> {
        signIn(provider, {
            callbackUrl: `${window.location.origin}/dashboard`
        })
    }}>
        <div className="flex gap-2 items-center">
            {providersConfig[provider].icon}{providersConfig[provider].label}
        </div>
    </Button>
  )
}
