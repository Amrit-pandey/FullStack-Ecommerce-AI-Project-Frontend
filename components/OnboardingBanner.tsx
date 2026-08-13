"use client"

import { AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/store/hooks"

export const OnboardingBanner = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { user, isAuthenticated, isInitialized } = useAppSelector((state) => state.auth)
    if (pathname === "/login" || pathname === "/onboarding") {
      return null;
    }
    if (!isInitialized || !isAuthenticated || !user || user.onboarding_status) {
      return null; 
    }
    return (
        <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-3 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3 sm:items-center">
                    <div className="text-amber-600 shrink-0 mt-0.5 sm:mt-0">
                        <AlertCircle className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-medium text-amber-900 leading-relaxed">
                        Your onboarding process is pending. Please complete it before placing an order.
                    </div>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push("/onboarding")}
                    className="w-full sm:w-auto bg-amber-600 border-amber-600 text-white hover:bg-amber-700 hover:text-white shadow-sm font-semibold transition-colors duration-200"
                >
                    Complete Now
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                </div>
            </div>
        </div>
    )
}