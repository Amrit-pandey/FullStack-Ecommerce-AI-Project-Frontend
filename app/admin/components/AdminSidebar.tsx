"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: Users
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: ShoppingBag
    },
    {
        title: "Orders",
        url: '/admin/orders',
        icon: ShoppingCart
    }
]

export const AdminSidebar = () => {
    return (
        <Sidebar className="top-20 h-[calc(100vh-80px)] border-r" data-slot="admin-sidebar">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Admin Panel
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        render={
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        }
                                    />
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}