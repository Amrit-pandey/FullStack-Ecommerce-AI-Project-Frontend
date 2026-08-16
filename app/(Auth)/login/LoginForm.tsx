"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/slices/authSlice";
import { requestOtp, verifyOtp } from "@/services/auth.service";
import { getCurrentUser } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LoginFormProps = {
    onNewUser: () => void
}

export const LoginForm = ({ onNewUser }: LoginFormProps ) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showOtpBoxes, setShowOtpBoxes] = useState(false)
    const [otpValue, setOtpValue] = useState("")

    const showOtp = () => {
        setShowOtpBoxes(true)
    }

    const handleEmailchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        console.log("handle submit called")
        e.preventDefault()
        try {
            setIsLoading(true)
            if(!showOtpBoxes) {
                const response = await requestOtp(email)
                if (response.message) {
                    toast.add({ type: "success", description: response.message })
                    showOtp()
                }
                return;
            }
            const response = await verifyOtp(email, otpValue)
            toast.add({type: "success", description: "OTP verified successfully"})
            dispatch(setUser(response.user))
            // new user onboarding process
            if(!response.user.onboarding_status && response.is_new_user && response.user.role){
                onNewUser()
                return;
            }
            // existing user direct naviagte to "/"
            if(response?.user?.role === "admin"){
                router.push('/admin')
                return;
            }
            router.push('/')
        } catch (error) {
            toast.add({ type: "warning", description: "Something went wrong" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="space-y-5 px-4 my-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    onChange={handleEmailchange}
                />
            </div>

            {showOtpBoxes &&
                <div className="space-y-2">
                    <Label htmlFor="otp">Verify Otp</Label>

                    <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            }
            <div className="">
                <span>Didn't recieve otp -</span>
                <Button variant="link" size="xs" className="font-bold cursor-pointer">
                    Resend Code
                </Button>
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading ?
                    <span className="flex items-center gap-2">
                        <Spinner />
                        Sending...
                    </span> :
                    showOtpBoxes ? "Verify Otp" : "Send OTP"
                }
            </Button>
        </form>
    );
}