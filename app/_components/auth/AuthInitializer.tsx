"use client"

import { useAppDispatch } from "@/lib/store/hooks"
import { clearUser, setUser, startAuthCheck } from "@/lib/store/slices/authSlice"
import { getCurrentUser } from "@/services/user.service"
import { useEffect } from "react"

export const AuthInitializer = ({children}: {children: React.ReactNode}) => {
    const dispatch = useAppDispatch()
    const AuthCheck = async() => {
        try {
            const user = await getCurrentUser()
            dispatch(setUser(user))
        } catch (error) {
            dispatch(clearUser())
        }
    }
    useEffect(() => {
        dispatch(startAuthCheck())
        AuthCheck()
    },[dispatch])
    return <>{children}</>
}