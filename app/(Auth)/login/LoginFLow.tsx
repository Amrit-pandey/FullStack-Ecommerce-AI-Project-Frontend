"use client"

import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { Onboarding } from "./Onboarding"

type Step = "login" | "onboarding" | "completed";

export const LoginFlow = () => {
    const [step, setStep] = useState<Step>("login")
    console.log(step, "step")
    return(
        <>
           {step === "login" && (
                <LoginForm
                    onNewUser={() => setStep("onboarding")}
                />
            )}

            {step === "onboarding" && (
                <Onboarding
                    onComplete={() => setStep("completed")}
                />
            )}

            {step === "completed" && (
                <div>
                    Your onboarding setup has been completed!
                </div>
            )}
        </>
    )
}