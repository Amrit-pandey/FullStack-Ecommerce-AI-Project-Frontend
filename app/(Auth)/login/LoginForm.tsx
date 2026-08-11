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
import { useState } from "react";

export default function LoginForm() {
    const [showOtpBoxes, setShowOtpBoxes] = useState(false)
    console.log(showOtpBoxes, "boxes")
    const [value, setValue] = useState("000000")

    const showOtp = () => {
        setShowOtpBoxes(true)
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
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {showOtpBoxes && 
                <div className="space-y-2">
                    <Label htmlFor="otp">Verify Otp</Label>
                
                    <InputOTP maxLength={6}>
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
            <Button className="w-full cursor-pointer" onClick={showOtp}>
              {showOtpBoxes ? "Verify Otp" : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}