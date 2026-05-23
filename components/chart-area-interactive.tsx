"use client"

import * as React from "react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import {
  TrendingUp,
  DollarSign,
} from "lucide-react"

const salesData = [
  { date: "2024-06-01", ventas: 1200 },
  { date: "2024-06-02", ventas: 2100 },
  { date: "2024-06-03", ventas: 1800 },
  { date: "2024-06-04", ventas: 2400 },
  { date: "2024-06-05", ventas: 3200 },
  { date: "2024-06-06", ventas: 2800 },
  { date: "2024-06-07", ventas: 3900 },
  { date: "2024-06-08", ventas: 4100 },
  { date: "2024-06-09", ventas: 3700 },
  { date: "2024-06-10", ventas: 4600 },
  { date: "2024-06-11", ventas: 4300 },
  { date: "2024-06-12", ventas: 5200 },
  { date: "2024-06-13", ventas: 4800 },
  { date: "2024-06-14", ventas: 6100 },
  { date: "2024-06-15", ventas: 5800 },
  { date: "2024-06-16", ventas: 7200 },
  { date: "2024-06-17", ventas: 6900 },
  { date: "2024-06-18", ventas: 7600 },
  { date: "2024-06-19", ventas: 8200 },
  { date: "2024-06-20", ventas: 9100 },
  { date: "2024-06-21", ventas: 8700 },
  { date: "2024-06-22", ventas: 9800 },
  { date: "2024-06-23", ventas: 10500 },
  { date: "2024-06-24", ventas: 9900 },
  { date: "2024-06-25", ventas: 11200 },
  { date: "2024-06-26", ventas: 12000 },
  { date: "2024-06-27", ventas: 11800 },
  { date: "2024-06-28", ventas: 12500 },
  { date: "2024-06-29", ventas: 13200 },
  { date: "2024-06-30", ventas: 14000 },
]

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()

  const [timeRange, setTimeRange] = React.useState("30d")

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = salesData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")

    let daysToSubtract = 30

    if (timeRange === "14d") {
      daysToSubtract = 14
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return date >= startDate
  })

  const totalVentas = filteredData.reduce(
    (acc, item) => acc + item.ventas,
    0
  )

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-xl">
      <CardHeader className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
              <DollarSign className="size-6 text-primary" />
            </div>

            <div>
              <CardTitle className="text-2xl font-bold">
                Reporte de Ventas
              </CardTitle>

              <CardDescription className="text-sm">
                Seguimiento de ingresos y ventas realizadas
              </CardDescription>
            </div>
          </div>
        </div>

        <CardAction className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl border bg-background px-5 py-3 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-emerald-600">
              <TrendingUp className="size-4" />
              +18.4% este mes
            </div>

            <div className="text-2xl font-bold tracking-tight">
              S/ {totalVentas.toLocaleString()}
            </div>
          </div>

          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) setTimeRange(value)
            }}
            variant="outline"
            className="hidden rounded-xl border bg-background p-1 md:flex"
          >
            <ToggleGroupItem value="30d" className="rounded-lg px-5">
              30 días
            </ToggleGroupItem>

            <ToggleGroupItem value="14d" className="rounded-lg px-5">
              14 días
            </ToggleGroupItem>

            <ToggleGroupItem value="7d" className="rounded-lg px-5">
              7 días
            </ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 rounded-xl md:hidden">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="30d">30 días</SelectItem>
              <SelectItem value="14d">14 días</SelectItem>
              <SelectItem value="7d">7 días</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="p-6">
        <div className="h-[380px] w-full">

          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient
                    id="ventasGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 4"
                  opacity={0.15}
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  minTickGap={25}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-PE", {
                      day: "numeric",
                      month: "short",
                    })
                  }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `S/${value / 1000}k`}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "18px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--background))",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                  }}
                  formatter={(value) => [
                    `S/ ${Number(value).toLocaleString()}`,
                    "Ventas",
                  ]}
                  labelFormatter={(label) => {
                    return new Date(label).toLocaleDateString("es-PE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="ventas"
                  stroke="hsl(var(--primary))"
                  strokeWidth={4}
                  fill="url(#ventasGradient)"
                  activeDot={{
                    r: 7,
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}