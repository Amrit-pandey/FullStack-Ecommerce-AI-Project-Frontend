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
import { requestOtp, verifyOtp } from "@/services/auth.service";
import { getCurrentUser } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function LoginForm() {
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
        e.preventDefault()
        try {
            setIsLoading(true)
            if(!showOtpBoxes) {
                const response = await requestOtp(email)
                if (response.message) {
                    toast.add({ type: "success", description: response.message })
                    showOtp()
                }
            } else {
                await verifyOtp(email, otpValue)
                toast.add({type: "success", description: "OTP verified successfully"})
            }
            await getCurrentUser()
        } catch (error) {
            toast.add({ type: "warning", description: "Something went wrong" })
        } finally {
            setIsLoading(false)
            setEmail("")
            setOtpValue("")
        }
    }

    return (
        <main className="flex flex-1 items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold">
                        Welcome to ShopOnBot.ai
                    </CardTitle>

                    <CardDescription>
                        Enter your email to continue
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
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
                </CardContent>
            </Card>
        </main>
    );
}