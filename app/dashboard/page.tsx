"use client"

import * as React from "react"
import {
  TrendingUp, TrendingDown, ShoppingBag, Users,
  Package, AlertTriangle, ArrowUpRight, ArrowDownRight,
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const ventasSemana = [
  { dia: "Lun", ventas: 1200 },
  { dia: "Mar", ventas: 2100 },
  { dia: "Mié", ventas: 1800 },
  { dia: "Jue", ventas: 2400 },
  { dia: "Vie", ventas: 3200 },
  { dia: "Sáb", ventas: 2800 },
  { dia: "Dom", ventas: 3900 },
]

const ingresosMensuales = [
  { mes: "Ene", ingresos: 8200,  pedidos: 120 },
  { mes: "Feb", ingresos: 9400,  pedidos: 145 },
  { mes: "Mar", ingresos: 7800,  pedidos: 110 },
  { mes: "Abr", ingresos: 10200, pedidos: 168 },
  { mes: "May", ingresos: 12500, pedidos: 200 },
  { mes: "Jun", ingresos: 11800, pedidos: 185 },
  { mes: "Jul", ingresos: 14000, pedidos: 220 },
  { mes: "Ago", ingresos: 13200, pedidos: 210 },
  { mes: "Sep", ingresos: 15400, pedidos: 245 },
  { mes: "Oct", ingresos: 16200, pedidos: 260 },
  { mes: "Nov", ingresos: 17800, pedidos: 285 },
  { mes: "Dic", ingresos: 18450, pedidos: 342 },
]

const estadosPedidos = [
  { nombre: "Entregado", valor: 198, color: "#22c55e" },
  { nombre: "Enviado",   valor: 62,  color: "#7c3aed" },
  { nombre: "Pagado",    valor: 41,  color: "#3b82f6" },
  { nombre: "Pendiente", valor: 28,  color: "#f59e0b" },
  { nombre: "Cancelado", valor: 13,  color: "#ef4444" },
]

const topProductos = [
  { nombre: "Zapatilla Running Pro X", marca: "Nike",      ventas: 89, pct: 100 },
  { nombre: "Bota Casual Urban",       marca: "Timberland", ventas: 67, pct: 75  },
  { nombre: "Sandalia Comfort Plus",   marca: "Adidas",     ventas: 54, pct: 61  },
  { nombre: "Mocasín Clásico",         marca: "Clarks",     ventas: 42, pct: 47  },
  { nombre: "Deportivo Flex Air",      marca: "Puma",       ventas: 31, pct: 35  },
]

const ultimosPedidos = [
  { id: "PED-342", cliente: "Jorge Paz",    total: 619.80, estado: "pagado"    },
  { id: "PED-341", cliente: "Ana Torres",   total: 409.90, estado: "enviado"   },
  { id: "PED-340", cliente: "Carlos Ruiz",  total: 464.80, estado: "pendiente" },
  { id: "PED-339", cliente: "María García", total: 309.90, estado: "entregado" },
  { id: "PED-338", cliente: "Sofía León",   total: 269.90, estado: "cancelado" },
]


type EstadoPedido = "pagado" | "enviado" | "pendiente" | "entregado" | "cancelado"

const ESTADO_MAP: Record<EstadoPedido, { label: string; clase: string }> = {
  pagado:    { label: "Pagado",    clase: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800" },
  enviado:   { label: "Enviado",   clase: "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800" },
  pendiente: { label: "Pendiente", clase: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800" },
  entregado: { label: "Entregado", clase: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800" },
  cancelado: { label: "Cancelado", clase: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800" },
}

function EstadoBadge({ estado }: { estado: string }) {
  const cfg = ESTADO_MAP[estado as EstadoPedido] ?? { label: estado, clase: "" }
  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${cfg.clase}`}>
      {cfg.label}
    </span>
  )
}


function CustomTooltip({ active, payload, label, prefix = "S/ " }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-none border-2 border-[#FAFF00] bg-white dark:bg-zinc-950 px-3 py-2 shadow-[4px_4px_0px_#FAFF00]">
      <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-sm font-black" style={{ color: p.color }}>
          {p.name}: {prefix}{Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  )
}


export default function DashboardPage() {
  const totalPedidos = estadosPedidos.reduce((a, e) => a + e.valor, 0)

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-950 min-h-screen">

      <div className="flex items-center justify-between border-b-4 border-[#FAFF00] pb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-8 w-1.5 bg-[#FAFF00]" />
            <h1 className="text-3xl font-black uppercase tracking-tight">Panel de Control</h1>
          </div>
          <p className="text-sm text-zinc-500 font-medium pl-4">
            Resumen de ventas, pedidos, clientes y productos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">En vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <div className="border-2 border-l-[#FAFF00] border-l-4 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Ingresos del mes</p>
              <p className="text-3xl font-black tracking-tight">S/ 18,450</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="size-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-600">+22% vs mes anterior</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center bg-[#FAFF00]">
              <TrendingUp className="size-4 text-black" />
            </div>
          </div>
        </div>

        <div className="border-2 border-l-emerald-500 border-l-4 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Clientes totales</p>
              <p className="text-3xl font-black tracking-tight">1,284</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="size-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-600">+38 este mes</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center bg-black">
              <Users className="size-4 text-[#FAFF00]" />
            </div>
          </div>
        </div>

        <div className="border-2 border-l-blue-500 border-l-4 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Pedidos totales</p>
              <p className="text-3xl font-black tracking-tight">342</p>
              <p className="text-xs font-bold text-zinc-500 mt-2">6 pendientes · 12 en camino</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center bg-black">
              <ShoppingBag className="size-4 text-[#FAFF00]" />
            </div>
          </div>
        </div>

        <div className="border-2 border-l-red-500 border-l-4 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Productos agotados</p>
              <p className="text-3xl font-black tracking-tight text-red-500">7</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertTriangle className="size-3.5 text-red-500" />
                <span className="text-xs font-bold text-red-500">Requiere restock</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center bg-red-600">
              <Package className="size-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        <div className="lg:col-span-2 border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Ventas</p>
              <p className="text-base font-black">Últimos 7 días</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#FAFF00] border border-zinc-300" />
              <span className="text-xs font-bold text-zinc-500">S/ Ventas</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ventasSemana} barCategoryGap="35%">
              <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="rgba(128,128,128,0.1)" />
              <XAxis
                dataKey="dia"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fontWeight: 700, fill: "#888" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#888" }}
                tickFormatter={v => `S/${v / 1000}k`}
              />
              <Tooltip content={<CustomTooltip prefix="S/ " />} cursor={{ fill: "rgba(250,255,0,0.05)" }} />
              <Bar dataKey="ventas" name="Ventas" fill="#FAFF00" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Estados</p>
            <p className="text-base font-black">Pedidos actuales</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={estadosPedidos}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={56}
                  paddingAngle={2}
                  dataKey="valor"
                  strokeWidth={2}
                  stroke="transparent"
                >
                  {estadosPedidos.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 0,
                    border: "2px solid #FAFF00",
                    background: "#fff",
                    boxShadow: "4px 4px 0 #FAFF00",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 flex-1">
              {estadosPedidos.map(e => (
                <div key={e.nombre} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: e.color }} />
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{e.nombre}</span>
                  </div>
                  <span className="text-xs font-black">{e.valor}</span>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-4 border-zinc-200 dark:border-zinc-800" />
          <div className="border-l-2 border-[#FAFF00] pl-3">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Total</p>
            <p className="text-2xl font-black">{totalPedidos}</p>
          </div>
        </div>
      </div>

      <div className="border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Rendimiento anual</p>
            <p className="text-base font-black">Ingresos y pedidos — 2024</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#FAFF00] border border-zinc-300" />
              <span className="text-xs font-bold text-zinc-500">Ingresos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-1 bg-blue-500" style={{ borderTop: "2px dashed #3b82f6" }} />
              <span className="text-xs font-bold text-zinc-500">Pedidos</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={ingresosMensuales} barCategoryGap="35%">
            <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="rgba(128,128,128,0.1)" />
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 700, fill: "#888" }}
            />
            <YAxis
              yAxisId="ingresos"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#888" }}
              tickFormatter={v => `S/${v / 1000}k`}
            />
            <YAxis
              yAxisId="pedidos"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#3b82f6" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(250,255,0,0.05)" }} />
            <Bar yAxisId="ingresos" dataKey="ingresos" name="Ingresos" fill="#FAFF00" radius={[2, 2, 0, 0]} />
            <Line
              yAxisId="pedidos"
              type="monotone"
              dataKey="pedidos"
              name="Pedidos"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={{ fill: "#3b82f6", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        <div className="border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="border-b-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Productos más vendidos</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] px-5 py-2 border-b-2 border-zinc-200 dark:border-zinc-800 bg-black">
            <span className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">Producto</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">Ventas</span>
          </div>
          {topProductos.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto] items-center px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
            >
              <div className="pr-4">
                <p className="text-sm font-black leading-tight">{p.nombre}</p>
                <p className="text-xs text-zinc-400 font-semibold mb-2">{p.marca}</p>
                <Progress
                  value={p.pct}
                  className="h-1.5 rounded-none bg-zinc-100 dark:bg-zinc-800 [&>div]:bg-[#FAFF00] [&>div]:rounded-none"
                />
              </div>
              <span className="text-xl font-black tabular-nums">{p.ventas}</span>
            </div>
          ))}
        </div>

        <div className="border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="border-b-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Últimos pedidos</p>
          </div>

          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-3 px-5 py-2 border-b-2 border-zinc-200 dark:border-zinc-800 bg-black">
            <span className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">ID</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">Cliente</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">Total</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">Estado</span>
          </div>
          {ultimosPedidos.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
            >
              <span className="font-mono text-xs font-black text-zinc-500 whitespace-nowrap">{p.id}</span>
              <span className="text-sm font-black truncate">{p.cliente}</span>
              <span className="text-sm font-black whitespace-nowrap">S/ {p.total.toFixed(2)}</span>
              <EstadoBadge estado={p.estado} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}