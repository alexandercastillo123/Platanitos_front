'use client'

import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

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
            <Footer />
        </div>
    )
}