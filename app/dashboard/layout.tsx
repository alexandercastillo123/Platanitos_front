"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tag,
  LogOut,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  function handleLogout() {
    router.push("/login")
  }

  const links = [
    {
      name: "Inicio",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Pedidos",
      href: "/dashboard/pedidos",
      icon: ShoppingBag,
    },
    {
      name: "Productos",
      href: "/dashboard/productos",
      icon: Package,
    },
    {
      name: "Marcas",
      href: "/dashboard/marcas",
      icon: Tag,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fc]">

      <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-yellow-400 text-black shadow-2xl">

        <div className="flex h-20 items-center border-b border-black/10 px-8">
          <div>
            <h1 className="text-3xl font-black tracking-wide">
              <img
                src="/images/logo.png"
                alt="Platanitos"
                className="h-28 w-auto object-contain"
              />
            </h1>
          </div>
        </div>

        <nav className="space-y-3 p-5">
          {links.map((link) => {
            const Icon = link.icon

            const active = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-black text-white shadow-lg"
                    : "text-slate-800 hover:bg-yellow-300 hover:text-black"
                }`}
              >
                <Icon
                  className={`size-5 transition-all duration-300 group-hover:scale-110 ${
                    active
                      ? "text-white"
                      : "text-black"
                  }`}
                />

                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-black/10 p-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition-all hover:bg-red-500 hover:text-white"
          >
            <LogOut className="size-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="ml-72">

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              Bienvenido al panel administrativo
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">
                Administrador
              </p>

              <p className="text-xs text-slate-500">
                admin@platanitos.com
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-black shadow-lg shadow-yellow-400/30">
              A
            </div>

          </div>
        </header>

        {/* MAIN */}
        <main className="p-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}