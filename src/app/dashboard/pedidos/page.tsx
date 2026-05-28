"use client"

import * as React from "react"
import {
  Search, Eye, X, Truck, CheckCircle,
  Clock, CreditCard, MoreHorizontal, Filter,
  MapPin, Phone, User, ShoppingBag, ChevronRight,
  AlertCircle, RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

type EstadoPedido = "pendiente" | "pagado" | "enviado" | "entregado" | "cancelado"

type ItemPedido = {
  id: number
  producto: string
  sku: string
  talla: string
  color: string
  cantidad: number
  precio: number
}

type Pedido = {
  id: string
  cliente: string
  email: string
  telefono: string
  direccion: string
  fecha: string
  estado: EstadoPedido
  items: ItemPedido[]
  subtotal: number
  envio: number
  total: number
  metodoPago: string
}

const mockPedidos: Pedido[] = [
  {
    id: "PED-001", cliente: "María García", email: "maria@gmail.com", telefono: "987-654-321",
    direccion: "Av. Larco 123, Miraflores, Lima", fecha: "2024-06-30", estado: "entregado",
    metodoPago: "Tarjeta de crédito", subtotal: 299.90, envio: 10.00, total: 309.90,
    items: [{ id: 1, producto: "Zapatilla Running Pro X", sku: "NK-RUN-001", talla: "39", color: "Negro", cantidad: 1, precio: 299.90 }],
  },
  {
    id: "PED-002", cliente: "Carlos Ruiz", email: "carlos@gmail.com", telefono: "912-345-678",
    direccion: "Calle Los Pinos 456, San Isidro, Lima", fecha: "2024-06-29", estado: "enviado",
    metodoPago: "Yape", subtotal: 449.80, envio: 15.00, total: 464.80,
    items: [
      { id: 2, producto: "Sandalia Comfort Plus", sku: "AD-SND-002", talla: "42", color: "Beige", cantidad: 2, precio: 149.90 },
      { id: 3, producto: "Mocasín Clásico", sku: "CL-MOC-004", talla: "41", color: "Marrón", cantidad: 1, precio: 149.90 },
    ],
  },
  {
    id: "PED-003", cliente: "Ana Torres", email: "ana@gmail.com", telefono: "956-789-012",
    direccion: "Jr. Huallaga 789, Cercado, Lima", fecha: "2024-06-28", estado: "pagado",
    metodoPago: "Plin", subtotal: 399.90, envio: 10.00, total: 409.90,
    items: [{ id: 4, producto: "Bota Casual Urban", sku: "TM-BOT-003", talla: "38", color: "Marrón", cantidad: 1, precio: 399.90 }],
  },
  {
    id: "PED-004", cliente: "Luis Mendoza", email: "luis@gmail.com", telefono: "934-567-890",
    direccion: "Av. Brasil 321, Pueblo Libre, Lima", fecha: "2024-06-27", estado: "pendiente",
    metodoPago: "Transferencia", subtotal: 189.90, envio: 10.00, total: 199.90,
    items: [{ id: 5, producto: "Deportivo Flex Air", sku: "PM-DEP-005", talla: "40", color: "Azul", cantidad: 1, precio: 189.90 }],
  },
  {
    id: "PED-005", cliente: "Sofía León", email: "sofia@gmail.com", telefono: "978-901-234",
    direccion: "Calle Roma 654, Lince, Lima", fecha: "2024-06-26", estado: "cancelado",
    metodoPago: "Tarjeta de débito", subtotal: 259.90, envio: 10.00, total: 269.90,
    items: [{ id: 6, producto: "Mocasín Clásico", sku: "CL-MOC-004", talla: "40", color: "Negro", cantidad: 1, precio: 259.90 }],
  },
  {
    id: "PED-006", cliente: "Jorge Paz", email: "jorge@gmail.com", telefono: "945-678-901",
    direccion: "Av. Universitaria 987, Los Olivos, Lima", fecha: "2024-06-25", estado: "pagado",
    metodoPago: "Yape", subtotal: 599.80, envio: 20.00, total: 619.80,
    items: [
      { id: 7, producto: "Zapatilla Running Pro X", sku: "NK-RUN-001", talla: "41", color: "Rojo", cantidad: 1, precio: 319.90 },
      { id: 8, producto: "Sandalia Comfort Plus", sku: "AD-SND-002", talla: "37", color: "Marrón", cantidad: 1, precio: 149.90 },
      { id: 9, producto: "Deportivo Flex Air", sku: "PM-DEP-005", talla: "39", color: "Verde", cantidad: 1, precio: 189.90 },
    ],
  },
]

const ESTADO_CONFIG: Record<EstadoPedido, {
  label: string; clase: string; icon: React.ElementType
  siguiente: EstadoPedido | null; labelSiguiente: string | null
}> = {
  pendiente: { label: "Pendiente", clase: "bg-amber-100 text-amber-800 border-amber-300",   icon: Clock,        siguiente: "pagado",    labelSiguiente: "Marcar como Pagado"    },
  pagado:    { label: "Pagado",    clase: "bg-blue-100 text-blue-800 border-blue-300",       icon: CreditCard,   siguiente: "enviado",   labelSiguiente: "Marcar como Enviado"   },
  enviado:   { label: "Enviado",   clase: "bg-violet-100 text-violet-800 border-violet-300", icon: Truck,        siguiente: "entregado", labelSiguiente: "Marcar como Entregado" },
  entregado: { label: "Entregado", clase: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: CheckCircle, siguiente: null, labelSiguiente: null },
  cancelado: { label: "Cancelado", clase: "bg-red-100 text-red-700 border-red-300",          icon: X,            siguiente: null,        labelSiguiente: null                    },
}

function EstadoBadge({ estado }: { estado: EstadoPedido }) {
  const cfg = ESTADO_CONFIG[estado]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${cfg.clase}`}>
      <Icon className="size-3" />
      {cfg.label}
    </span>
  )
}

function EstadoStepper({ estado }: { estado: EstadoPedido }) {
  const pasos: EstadoPedido[] = ["pendiente", "pagado", "enviado", "entregado"]

  if (estado === "cancelado") {
    return (
      <div className="flex items-center gap-2 border-2 border-red-300 bg-red-50 dark:bg-red-950/30 px-4 py-3">
        <AlertCircle className="size-4 text-red-500" />
        <span className="text-xs font-black uppercase tracking-widest text-red-600">Pedido cancelado</span>
      </div>
    )
  }

  const idx = pasos.indexOf(estado)
  return (
    <div className="flex items-center w-full">
      {pasos.map((paso, i) => {
        const cfg = ESTADO_CONFIG[paso]
        const Icon = cfg.icon
        const activo    = i === idx
        const completado = i < idx
        const pendiente  = i > idx
        return (
          <React.Fragment key={paso}>
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`flex h-9 w-9 items-center justify-center border-2 transition-all
                ${activo    ? "border-black bg-[#FAFF00] text-black" : ""}
                ${completado ? "border-black bg-black text-[#FAFF00]" : ""}
                ${pendiente  ? "border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-400" : ""}
              `}>
                <Icon className="size-3.5" />
              </div>
              <span className={`text-xs font-black uppercase tracking-wide whitespace-nowrap
                ${activo    ? "text-black dark:text-white" : ""}
                ${completado ? "text-zinc-500" : ""}
                ${pendiente  ? "text-zinc-300 dark:text-zinc-600" : ""}
              `}>{cfg.label}</span>
            </div>
            {i < pasos.length - 1 && (
              <div className={`h-0.5 flex-1 mb-5 transition-all ${i < idx ? "bg-black dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700"}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function DetallePedidoModal({ pedido, onClose, onCambiarEstado }: {
  pedido: Pedido; onClose: () => void
  onCambiarEstado: (id: string, estado: EstadoPedido) => void
}) {
  const cfg = ESTADO_CONFIG[pedido.estado]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-none border-2 border-[#FAFF00] bg-white dark:bg-zinc-950 shadow-[6px_6px_0px_#FAFF00]">

        <div className="flex items-center justify-between bg-black px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-[#FAFF00]">
              <ShoppingBag className="size-4 text-black" />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-widest text-white">{pedido.id}</h2>
              <p className="text-xs text-zinc-400 font-medium">
                {new Date(pedido.fecha).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="py-2 px-2">
            <EstadoStepper estado={pedido.estado} />
          </div>

          {cfg.siguiente && (
            <div className="flex items-center justify-between border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                <RefreshCw className="size-3.5" /> Avanzar estado
              </div>
              <button onClick={() => onCambiarEstado(pedido.id, cfg.siguiente!)}
                className="flex items-center gap-1.5 bg-[#FAFF00] px-4 py-2 text-xs font-black uppercase tracking-widest text-black hover:bg-yellow-300 transition-colors">
                {cfg.labelSiguiente} <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}

          {pedido.estado !== "cancelado" && pedido.estado !== "entregado" && (
            <button onClick={() => onCambiarEstado(pedido.id, "cancelado")}
              className="text-xs font-bold uppercase tracking-wide text-red-500 hover:text-red-700 hover:underline transition-colors">
              Cancelar pedido
            </button>
          )}

          <Separator className="border-zinc-200 dark:border-zinc-800" />

          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Información del cliente</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: User,       label: pedido.cliente },
                { icon: Phone,      label: pedido.telefono },
                { icon: MapPin,     label: pedido.direccion },
                { icon: CreditCard, label: pedido.metodoPago },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-2 border-l-2 border-[#FAFF00] pl-3 py-1">
                  <Icon className="size-3.5 text-zinc-400 mt-0.5 shrink-0" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="border-zinc-200 dark:border-zinc-800" />

          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Productos <span className="text-[#8a8f00] dark:text-[#d4d900]">({pedido.items.length})</span>
            </p>
            <div className="border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-black hover:bg-black">
                    <TableHead className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">Producto</TableHead>
                    <TableHead className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">Talla / Color</TableHead>
                    <TableHead className="text-xs font-black uppercase tracking-widest text-[#FAFF00] text-right">Cant.</TableHead>
                    <TableHead className="text-xs font-black uppercase tracking-widest text-[#FAFF00] text-right">Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedido.items.map(item => (
                    <TableRow key={item.id} className="border-b border-zinc-100 dark:border-zinc-800">
                      <TableCell>
                        <p className="text-sm font-black">{item.producto}</p>
                        <p className="text-xs text-zinc-400 font-mono">{item.sku}</p>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">{item.talla} / {item.color}</TableCell>
                      <TableCell className="text-sm font-black text-right">{item.cantidad}</TableCell>
                      <TableCell className="text-sm font-black text-right">S/ {(item.precio * item.cantidad).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="border-2 border-zinc-200 dark:border-zinc-700 p-4 space-y-2 bg-zinc-50 dark:bg-zinc-900">
            {[["Subtotal", `S/ ${pedido.subtotal.toFixed(2)}`], ["Envío", `S/ ${pedido.envio.toFixed(2)}`]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm text-zinc-500 font-medium">
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <Separator className="border-zinc-300 dark:border-zinc-700" />
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-black uppercase tracking-widest">Total</span>
              <span className="text-xl font-black">S/ {pedido.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-6 py-4">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest border-2 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = React.useState<Pedido[]>(mockPedidos)
  const [search, setSearch] = React.useState("")
  const [filtroEstado, setFiltroEstado] = React.useState("todos")
  const [viendo, setViendo] = React.useState<Pedido | null>(null)

  const filtrados = pedidos.filter(p => {
    const matchSearch = p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    const matchEstado = filtroEstado === "todos" || p.estado === filtroEstado
    return matchSearch && matchEstado
  })

  function cambiarEstado(id: string, nuevoEstado: EstadoPedido) {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p))
    setViendo(prev => prev?.id === id ? { ...prev, estado: nuevoEstado } : prev)
  }

  const stats = {
    total:     pedidos.length,
    pendiente: pedidos.filter(p => p.estado === "pendiente").length,
    enviado:   pedidos.filter(p => p.estado === "enviado").length,
    ingresos:  pedidos.filter(p => p.estado !== "cancelado").reduce((a, p) => a + p.total, 0),
  }

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-950 min-h-screen">

      <div className="flex items-center justify-between border-b-4 border-[#FAFF00] pb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-8 w-1.5 bg-[#FAFF00]" />
            <h1 className="text-3xl font-black uppercase tracking-tight">Pedidos</h1>
          </div>
          <p className="text-sm text-zinc-500 font-medium pl-4">Gestiona y actualiza el estado de los pedidos</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total pedidos", value: stats.total,                        accent: "border-zinc-900 dark:border-white" },
          { label: "Pendientes",    value: stats.pendiente,                    accent: "border-amber-400" },
          { label: "En camino",     value: stats.enviado,                      accent: "border-violet-500" },
          { label: "Ingresos",      value: `S/ ${stats.ingresos.toFixed(2)}`,  accent: "border-[#FAFF00]" },
        ].map(s => (
          <div key={s.label} className={`border-2 ${s.accent} bg-white dark:bg-zinc-900 p-4`}>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">{s.label}</p>
            <p className="text-2xl font-black tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="border-2 border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-2 border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <Input placeholder="Buscar ID, cliente o email..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0 text-sm font-medium bg-white dark:bg-zinc-950" />
          </div>
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-44 rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00] text-xs font-bold uppercase bg-white dark:bg-zinc-950">
              <Filter className="size-3.5 mr-1 text-zinc-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="pagado">Pagado</SelectItem>
              <SelectItem value="enviado">Enviado</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-black hover:bg-black border-none">
              {["Pedido", "Cliente", "Fecha", "Items", "Total", "Pago", "Estado", ""].map(h => (
                <TableHead key={h} className="text-xs font-black uppercase tracking-widest text-[#FAFF00] py-3.5 first:pl-4">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-zinc-400">
                    <ShoppingBag className="size-12 opacity-20" />
                    <p className="text-xs font-black uppercase tracking-widest">Sin resultados</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtrados.map(p => {
                const cfg = ESTADO_CONFIG[p.estado]
                return (
                  <TableRow key={p.id}
                    className="border-b border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    onClick={() => setViendo(p)}>
                    <TableCell className="pl-4">
                      <span className="font-mono text-sm font-black">{p.id}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-black">{p.cliente}</p>
                      <p className="text-xs text-zinc-400 font-medium">{p.email}</p>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-zinc-500">
                      {new Date(p.fecha).toLocaleDateString("es-PE", { day: "numeric", month: "short" })}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-black">
                        {p.items.length} {p.items.length === 1 ? "item" : "items"}
                      </span>
                    </TableCell>
                    <TableCell><span className="text-sm font-black">S/ {p.total.toFixed(2)}</span></TableCell>
                    <TableCell className="text-sm font-semibold text-zinc-500">{p.metodoPago}</TableCell>
                    <TableCell><EstadoBadge estado={p.estado} /></TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-800">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-none border-2 border-zinc-200 dark:border-zinc-700 p-0 shadow-[4px_4px_0px_#FAFF00]">
                          <DropdownMenuItem className="gap-2 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wide"
                            onClick={() => setViendo(p)}>
                            <Eye className="size-3.5" /> Ver detalle
                          </DropdownMenuItem>
                          {cfg.siguiente && (
                            <>
                              <DropdownMenuSeparator className="my-0 border-zinc-200 dark:border-zinc-700" />
                              <DropdownMenuItem className="gap-2 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wide"
                                onClick={() => cambiarEstado(p.id, cfg.siguiente!)}>
                                <RefreshCw className="size-3.5" /> {cfg.labelSiguiente}
                              </DropdownMenuItem>
                            </>
                          )}
                          {p.estado !== "cancelado" && p.estado !== "entregado" && (
                            <>
                              <DropdownMenuSeparator className="my-0 border-zinc-200 dark:border-zinc-700" />
                              <DropdownMenuItem className="gap-2 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-red-600 focus:text-red-600 focus:bg-red-50"
                                onClick={() => cambiarEstado(p.id, "cancelado")}>
                                <X className="size-3.5" /> Cancelar pedido
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t-2 border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50 dark:bg-zinc-900">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {filtrados.length} de {pedidos.length} pedidos
          </p>
        </div>
      </div>

      {viendo && (
        <DetallePedidoModal pedido={viendo} onClose={() => setViendo(null)} onCambiarEstado={cambiarEstado} />
      )}
    </div>
  )
}