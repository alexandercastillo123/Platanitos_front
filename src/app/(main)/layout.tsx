'use client'
import { Navbar } from "@/components/shared/navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar/>
            <main className="p-5">
                {children}
            </main>
        </div>
    )
}