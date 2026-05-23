"use client"

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()

  function handleLogout() {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold">
            Dashboard
          </h1>
        </div>

        <nav className="space-y-2 p-4">
          <a
            href="/dashboard"
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Inicio
          </a>

          <a
            href="/dashboard/pedidos"
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Pedidos
          </a>

          <a
            href="/dashboard/productos"
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Productos
          </a>
          
          <a
            href="/dashboard/marcas"
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Marcas
          </a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
          <h2 className="text-lg font-semibold">
            Panel Administrativo
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Admin
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              A
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="size-4" />
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}