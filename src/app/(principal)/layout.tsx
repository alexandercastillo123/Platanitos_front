'use client'
import { Navbar } from "@/components/shared/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar/>
            <main className=" p-5 mx-75">
                {children}
            </main>
        </div>
    )
}