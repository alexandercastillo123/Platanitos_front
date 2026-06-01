'use client'

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer"

export default function CarritoLayout({
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
            <Footer />
        </div>
    )
}