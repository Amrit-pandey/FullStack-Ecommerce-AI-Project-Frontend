import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./components/AdminSidebar";

export default function AdminLayout({children}: LayoutProps<"/admin">) {
    return(
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
            {children}
            </SidebarInset>
        </SidebarProvider>
    )
}