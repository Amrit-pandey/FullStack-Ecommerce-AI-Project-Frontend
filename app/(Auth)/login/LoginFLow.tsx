"use client"

import { useEffect, useState } from "react"
import { LoginForm } from "./LoginForm"
import { Onboarding } from "./Onboarding"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { getCurrentUser } from "@/services/user.service";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type Step = "login" | "onboarding" | "completed";

const MotionCard = motion(Card)
const fadeVariants: Variants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2, ease: "easeIn" } }
}

export const LoginFlow = () => {
    const dispatch = useAppDispatch()
    const { isAuthenticated, isInitialized, user, isLoading } = useAppSelector((state) => state.auth)
    const router = useRouter()
    const [step, setStep] = useState<Step>("login")
    console.log(step, "step")

    const stepContent = {
        login: {
            header: "Welcome to ShopOnBot.ai",
            paragraph: "Enter your email to continue",
        },
        onboarding: {
            header: "Welcome to Onboarding process",
            paragraph: "Please enter and upload your full name and profile",
        },
        completed: {
            header: "Your onboarding process has been successfully completed",
            paragraph: "Explore different products and enjoy ShopOnBot.ai",
        },
    };

    useEffect(() => {
        if(step === "onboarding"){
            return;
        }
        if(isAuthenticated && isInitialized && user){
            router.push("/")
        }
    }, [isAuthenticated, isInitialized, user])

    const handleClick = async() => {
        const user = await getCurrentUser()
        dispatch(setUser(user))
        router.push("/")
    }

    if (!isInitialized || isLoading) {
        return (
            <main className="flex flex-1 items-center justify-center px-4 py-12 min-h-[50vh]">
                <div className="flex flex-col items-center gap-2">
                     <Spinner />
                </div>
            </main>
        );
    }
    

    return(
        <main className="flex flex-1 items-center justify-center px-4 py-12">
            <MotionCard layout className="w-full max-w-md overflow-hidden shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={fadeVariants}
                        >
                            <CardTitle className="text-2xl font-semibold">
                                {stepContent[step].header}
                            </CardTitle>
                            <CardDescription>
                                {stepContent[step].paragraph}
                            </CardDescription>
                        </motion.div>
                    </AnimatePresence>
                </CardHeader>
                <CardContent className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={fadeVariants}
                            className="w-full"
                        >
                           {step === "login" && (
                                <LoginForm onNewUser={() => setStep("onboarding")} />
                            )}
                            
                            {step === "onboarding" && (
                                <Onboarding onComplete={() => setStep("completed")} />
                            )}

                                {step === "completed" && (
                                    <Button
                                    className="w-full"
                                    onClick={handleClick}
                                    >
                                    Continue
                                    </Button>
                                )}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </MotionCard>
        </main>
    )
}