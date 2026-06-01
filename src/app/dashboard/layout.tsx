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
    router.push("/iniciar-sesion")
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">

      <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-white border-r border-gray-200 shadow-xl">

        <div className="flex h-20 items-center border-b border-gray-200 px-6">
          <Link href="/home" className="flex items-center gap-3">
            <img
              src="/img/platanitos.png"
              alt="Platanitos"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold text-gray-800">Admin</span>
          </Link>
        </div>

        <nav className="space-y-2 p-4">
          {links.map((link) => {
            const Icon = link.icon

            const active = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <Icon
                  className={`size-5 transition-transform duration-200 group-hover:scale-110 ${
                      active
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                />

                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-red-500 hover:text-white"
          >
            <LogOut className="size-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="ml-72">

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Bienvenido al panel administrativo
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                Administrador
              </p>

              <p className="text-xs text-gray-500">
                admin@platanitos.com
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-sm font-bold text-white shadow-lg">
              A
            </div>

          </div>
        </header>

        <main className="p-8">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}