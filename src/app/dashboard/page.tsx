"use client"

import * as React from "react"
import { ShoppingBag, Users, Package, AlertTriangle, ArrowUpRight, DollarSign } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const ventasSemana = [
  { dia: "Lun", ventas: 1200 }, { dia: "Mar", ventas: 2100 }, { dia: "Mié", ventas: 1800 },
  { dia: "Jue", ventas: 2400 }, { dia: "Vie", ventas: 3200 }, { dia: "Sáb", ventas: 2800 },
  { dia: "Dom", ventas: 3900 },
]

const ingresosMensuales = [
  { mes: "Ene", ingresos: 8200, pedidos: 120 }, { mes: "Feb", ingresos: 9400, pedidos: 145 },
  { mes: "Mar", ingresos: 7800, pedidos: 110 }, { mes: "Abr", ingresos: 10200, pedidos: 168 },
  { mes: "May", ingresos: 12500, pedidos: 200 }, { mes: "Jun", ingresos: 11800, pedidos: 185 },
  { mes: "Jul", ingresos: 14000, pedidos: 220 }, { mes: "Ago", ingresos: 13200, pedidos: 210 },
  { mes: "Sep", ingresos: 15400, pedidos: 245 }, { mes: "Oct", ingresos: 16200, pedidos: 260 },
  { mes: "Nov", ingresos: 17800, pedidos: 285 }, { mes: "Dic", ingresos: 18450, pedidos: 342 },
]

const estadosPedidos = [
  { nombre: "Entregado", valor: 198, color: "#22c55e" },
  { nombre: "Enviado", valor: 62, color: "#6366f1" },
  { nombre: "Pagado", valor: 41, color: "#3b82f6" },
  { nombre: "Pendiente", valor: 28, color: "#f59e0b" },
  { nombre: "Cancelado", valor: 13, color: "#ef4444" },
]

const topProductos = [
  { nombre: "Zapatilla Running Pro X", marca: "Nike", ventas: 89, pct: 100 },
  { nombre: "Bota Casual Urban", marca: "Timberland", ventas: 67, pct: 75 },
  { nombre: "Sandalia Comfort Plus", marca: "Adidas", ventas: 54, pct: 61 },
  { nombre: "Mocasín Clásico", marca: "Clarks", ventas: 42, pct: 47 },
  { nombre: "Deportivo Flex Air", marca: "Puma", ventas: 31, pct: 35 },
]

const ultimosPedidos = [
  { id: "PED-342", cliente: "Jorge Paz", total: 619.80, estado: "pagado" },
  { id: "PED-341", cliente: "Ana Torres", total: 409.90, estado: "enviado" },
  { id: "PED-340", cliente: "Carlos Ruiz", total: 464.80, estado: "pendiente" },
  { id: "PED-339", cliente: "María García", total: 309.90, estado: "entregado" },
  { id: "PED-338", cliente: "Sofía León", total: 269.90, estado: "cancelado" },
]

type EstadoPedido = "pagado" | "enviado" | "pendiente" | "entregado" | "cancelado"

const ESTADO_MAP: Record<EstadoPedido, { label: string; clase: string }> = {
  pagado: { label: "Pagado", clase: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300" },
  enviado: { label: "Enviado", clase: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300" },
  pendiente: { label: "Pendiente", clase: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300" },
  entregado: { label: "Entregado", clase: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300" },
  cancelado: { label: "Cancelado", clase: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300" },
}

function EstadoBadge({ estado }: { estado: string }) {
  const cfg = ESTADO_MAP[estado as EstadoPedido] ?? { label: estado, clase: "" }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.clase}`}>
      {cfg.label}
    </span>
  )
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ color: string; name: string; value: number }>
  label?: string
  prefix?: string
}

function CustomTooltip({ active, payload, label, prefix = "S/ " }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-white dark:bg-zinc-950 px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name}: {prefix}{Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const totalPedidos = estadosPedidos.reduce((a, e) => a + e.valor, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
            <p className="text-sm text-gray-500 mt-1">Resumen de ventas, pedidos, clientes y productos</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-600">En vivo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-gray-500 uppercase">Ingresos del mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">S/ 18,450</p>
                  <div className="flex items-center gap-1 mt-1 text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm font-medium">+22% vs mes anterior</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-gray-500 uppercase">Clientes totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">1,284</p>
                  <div className="flex items-center gap-1 mt-1 text-blue-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm font-medium">+38 este mes</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-gray-500 uppercase">Pedidos totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">342</p>
                  <p className="text-sm text-gray-500 mt-1">6 pendientes · 12 en camino</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <ShoppingBag className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-gray-500 uppercase">Productos agotados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-red-500">7</p>
                  <div className="flex items-center gap-1 mt-1 text-red-500">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Requiere restock</span>
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-500 uppercase">Ventas últimos 7 días</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={ventasSemana} barCategoryGap="35%">
                  <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="rgba(128,128,128,0.1)" />
                  <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: "#666" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#888" }} tickFormatter={v => `S/${v / 1000}k`} />
                  <Tooltip content={<CustomTooltip prefix="S/ " />} cursor={{ fill: "rgba(16,185,129,0.08)" }} />
                  <Bar dataKey="ventas" name="Ventas" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-500 uppercase">Estados de pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={110} height={110}>
                  <PieChart>
                    <Pie data={estadosPedidos} cx="50%" cy="50%" innerRadius={32} outerRadius={50} paddingAngle={3} dataKey="valor" strokeWidth={2} stroke="white">
                      {estadosPedidos.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-1.5 flex-1">
                  {estadosPedidos.map(e => (
                    <div key={e.nombre} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full flex-shrink-0" style={{ background: e.color }} />
                        <span className="text-gray-600 font-medium">{e.nombre}</span>
                      </div>
                      <span className="font-bold text-gray-800">{e.valor}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-baseline gap-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Total</p>
                <p className="text-2xl font-bold text-gray-800">{totalPedidos}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase">Rendimiento anual 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ingresosMensuales} barCategoryGap="35%">
                <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="rgba(128,128,128,0.1)" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#666" }} />
                <YAxis yAxisId="ingresos" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#888" }} tickFormatter={v => `S/${v / 1000}k`} />
                <YAxis yAxisId="pedidos" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6366f1" }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16,185,129,0.08)" }} />
                <Bar yAxisId="ingresos" dataKey="ingresos" name="Ingresos" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Line yAxisId="pedidos" type="monotone" dataKey="pedidos" name="Pedidos" stroke="#6366f1" strokeWidth={2.5} strokeDasharray="5 3" dot={{ fill: "#6366f1", r: 4 }} activeDot={{ r: 6 }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-500 uppercase">Productos más vendidos</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {topProductos.map((p, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{p.nombre}</p>
                      <p className="text-xs text-gray-500 mb-2">{p.marca}</p>
                      <Progress value={p.pct} className="h-2" />
                    </div>
                    <span className="text-xl font-bold text-gray-800 tabular-nums">{p.ventas}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-500 uppercase">Últimos pedidos</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {ultimosPedidos.map((p, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center py-2.5 border-b border-gray-100 last:border-0">
                    <span className="font-mono text-xs font-medium text-gray-500">{p.id}</span>
                    <span className="text-sm font-semibold text-gray-800 truncate">{p.cliente}</span>
                    <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">S/ {p.total.toFixed(2)}</span>
                    <EstadoBadge estado={p.estado} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}