"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  DollarSign,
  Users,
  Activity,
  ShoppingCart,
  TrendingUp,
} from "lucide-react"

const stats = [
  {
    title: "Ventas hechas",
    value: "10",
    change: "+12.5%",
    description: "Incremento respecto al mes pasado",
    icon: DollarSign,
  },
  {
    title: "Usuarios",
    value: "116",
    change: "+8.2%",
    description: "Nuevos Usuarios registrados",
    icon: Users,
  },
  {
    title: "Productos Registrados",
    value: "356",
    change: "+18.1%",
    description: "Pedidos procesados hoy",
    icon: ShoppingCart,
  },
  {
    title: "Actividad",
    value: "89%",
    change: "+4.3%",
    description: "Nivel de actividad general",
    icon: Activity,
  },
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 xl:grid-cols-4 lg:px-6">
      {stats.map((item) => {
        const Icon = item.icon

        return (
          <Card
            key={item.title}
            className="
              group
              overflow-hidden
              rounded-2xl
              border
              border-border/50
              bg-background/80
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <CardContent className="p-6">
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight">
                    {item.value}
                  </h2>
                </div>

                {/* ICON */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <Icon className="size-6" />
                </div>
              </div>

              {/* STATS */}
              <div className="mt-6 flex items-center justify-between">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-emerald-500/10
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  <TrendingUp className="size-4" />
                  {item.change}
                </div>

                <span className="text-xs text-muted-foreground">
                  Este mes
                </span>
              </div>

              {/* FOOTER */}
              <div className="mt-4 border-t pt-4 text-sm text-muted-foreground">
                {item.description}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}