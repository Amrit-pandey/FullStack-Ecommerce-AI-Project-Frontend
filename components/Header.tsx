"use client"

import Link from "next/link";
import { Search, ShoppingCart, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.service";
import { toast } from "./ui/toast";
import { clearUser } from "@/lib/store/slices/authSlice";

export const Header = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user, isAuthenticated, isInitialized, isLoading } = useAppSelector((state) => state.auth)
    console.log(user, isAuthenticated, "from header")

    const handleLogout = async() => {
        const response = await logout()
        if(response.message){
            toast.add({type: "success", description: response.message})
        }
        dispatch(clearUser(response))
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <Link
                href="/"
                className="flex h-full shrink-0 items-center"
                >
                <Image src="/logo.png" alt="ShopOnBot.ai" width={300} height={60} className="block bject-contain" priority/>
                </Link>

                <form className="order-3 w-full sm:order-none sm:flex-1">
                    <div className="relative mx-auto max-w-xl">
                        <Search
                        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                        />

                        <input
                        type="search"
                        name="search"
                        placeholder="Search products..."
                        className="h-10 w-full rounded-md border bg-background pl-9 pr-4 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                    </div>
                </form>
                <div className="ml-auto flex shrink-0 items-center gap-2">
                {!isInitialized || isLoading ? (
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                ): isAuthenticated ? (
                    <>
                    <Link
                        href="/cart"
                        aria-label="Shopping cart"
                        className="relative inline-flex size-10 items-center justify-center rounded-md transition hover:bg-muted"
                    >
                        <ShoppingCart className="size-5" />
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                        0
                        </span>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    className="flex h-auto items-center gap-2 rounded-full px-2 py-1.5 cursor-pointer"
                                >
                                    <Avatar className="size-8">
                                        <AvatarImage
                                            src={user?.image_url ?? undefined}
                                            alt={user?.full_name ?? "Profile"}
                                        />

                                        <AvatarFallback>
                                            {user?.full_name?.charAt(0).toUpperCase() ?? "U"}
                                        </AvatarFallback>

                                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                                    </Avatar>

                                    <span className="hidden max-w-24 truncate text-sm font-medium sm:block">
                                        {user?.full_name ?? "Profile"}
                                    </span>
                                </Button>
                            }
                        />

                        <DropdownMenuContent align="end" className="w-48 mt-3">
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => router.push("/profile")}
                                >
                                    Profile
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={handleLogout}
                                variant="destructive"
                            >
                                <LogOutIcon />
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </>
                ) : (
                    <Link
                    href="/login"
                    //   className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                    >
                    <Button size="lg">Login</Button>
                    </Link>
                )}
                </div>
            </div>
        </header>
    );
}