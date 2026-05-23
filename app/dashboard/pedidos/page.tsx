"use client"

import * as React from "react"
import {
  Search, Eye, X, Package, Truck, CheckCircle,
  Clock, CreditCard, MoreHorizontal, Filter,
  MapPin, Phone, User, ShoppingBag, ChevronRight,
  AlertCircle, RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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

/* ============================================================
   TIPOS
============================================================ */
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

/* ============================================================
   MOCK DATA
============================================================ */
const mockPedidos: Pedido[] = [
  {
    id: "PED-001",
    cliente: "María García",
    email: "maria@gmail.com",
    telefono: "987-654-321",
    direccion: "Av. Larco 123, Miraflores, Lima",
    fecha: "2024-06-30",
    estado: "entregado",
    metodoPago: "Tarjeta de crédito",
    subtotal: 299.90,
    envio: 10.00,
    total: 309.90,
    items: [
      { id: 1, producto: "Zapatilla Running Pro X", sku: "NK-RUN-001", talla: "39", color: "Negro", cantidad: 1, precio: 299.90 },
    ],
  },
  {
    id: "PED-002",
    cliente: "Carlos Ruiz",
    email: "carlos@gmail.com",
    telefono: "912-345-678",
    direccion: "Calle Los Pinos 456, San Isidro, Lima",
    fecha: "2024-06-29",
    estado: "enviado",
    metodoPago: "Yape",
    subtotal: 449.80,
    envio: 15.00,
    total: 464.80,
    items: [
      { id: 2, producto: "Sandalia Comfort Plus", sku: "AD-SND-002", talla: "42", color: "Beige", cantidad: 2, precio: 149.90 },
      { id: 3, producto: "Mocasín Clásico", sku: "CL-MOC-004", talla: "41", color: "Marrón", cantidad: 1, precio: 149.90 },
    ],
  },
  {
    id: "PED-003",
    cliente: "Ana Torres",
    email: "ana@gmail.com",
    telefono: "956-789-012",
    direccion: "Jr. Huallaga 789, Cercado, Lima",
    fecha: "2024-06-28",
    estado: "pagado",
    metodoPago: "Plin",
    subtotal: 399.90,
    envio: 10.00,
    total: 409.90,
    items: [
      { id: 4, producto: "Bota Casual Urban", sku: "TM-BOT-003", talla: "38", color: "Marrón", cantidad: 1, precio: 399.90 },
    ],
  },
  {
    id: "PED-004",
    cliente: "Luis Mendoza",
    email: "luis@gmail.com",
    telefono: "934-567-890",
    direccion: "Av. Brasil 321, Pueblo Libre, Lima",
    fecha: "2024-06-27",
    estado: "pendiente",
    metodoPago: "Transferencia",
    subtotal: 189.90,
    envio: 10.00,
    total: 199.90,
    items: [
      { id: 5, producto: "Deportivo Flex Air", sku: "PM-DEP-005", talla: "40", color: "Azul", cantidad: 1, precio: 189.90 },
    ],
  },
  {
    id: "PED-005",
    cliente: "Sofía León",
    email: "sofia@gmail.com",
    telefono: "978-901-234",
    direccion: "Calle Roma 654, Lince, Lima",
    fecha: "2024-06-26",
    estado: "cancelado",
    metodoPago: "Tarjeta de débito",
    subtotal: 259.90,
    envio: 10.00,
    total: 269.90,
    items: [
      { id: 6, producto: "Mocasín Clásico", sku: "CL-MOC-004", talla: "40", color: "Negro", cantidad: 1, precio: 259.90 },
    ],
  },
  {
    id: "PED-006",
    cliente: "Jorge Paz",
    email: "jorge@gmail.com",
    telefono: "945-678-901",
    direccion: "Av. Universitaria 987, Los Olivos, Lima",
    fecha: "2024-06-25",
    estado: "pagado",
    metodoPago: "Yape",
    subtotal: 599.80,
    envio: 20.00,
    total: 619.80,
    items: [
      { id: 7, producto: "Zapatilla Running Pro X", sku: "NK-RUN-001", talla: "41", color: "Rojo", cantidad: 1, precio: 319.90 },
      { id: 8, producto: "Sandalia Comfort Plus", sku: "AD-SND-002", talla: "37", color: "Marrón", cantidad: 1, precio: 149.90 },
      { id: 9, producto: "Deportivo Flex Air", sku: "PM-DEP-005", talla: "39", color: "Verde", cantidad: 1, precio: 189.90 },
    ],
  },
]

/* ============================================================
   CONFIGURACIÓN DE ESTADOS
============================================================ */
const ESTADO_CONFIG: Record<EstadoPedido, {
  label: string
  clase: string
  icon: React.ElementType
  siguiente: EstadoPedido | null
  labelSiguiente: string | null
}> = {
  pendiente: {
    label: "Pendiente",
    clase: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock,
    siguiente: "pagado",
    labelSiguiente: "Marcar como Pagado",
  },
  pagado: {
    label: "Pagado",
    clase: "bg-blue-100 text-blue-700 border-blue-200",
    icon: CreditCard,
    siguiente: "enviado",
    labelSiguiente: "Marcar como Enviado",
  },
  enviado: {
    label: "Enviado",
    clase: "bg-violet-100 text-violet-700 border-violet-200",
    icon: Truck,
    siguiente: "entregado",
    labelSiguiente: "Marcar como Entregado",
  },
  entregado: {
    label: "Entregado",
    clase: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
    siguiente: null,
    labelSiguiente: null,
  },
  cancelado: {
    label: "Cancelado",
    clase: "bg-red-100 text-red-600 border-red-200",
    icon: X,
    siguiente: null,
    labelSiguiente: null,
  },
}

/* ============================================================
   BADGE DE ESTADO
============================================================ */
function EstadoBadge({ estado }: { estado: EstadoPedido }) {
  const cfg = ESTADO_CONFIG[estado]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.clase}`}>
      <Icon className="size-3" />
      {cfg.label}
    </span>
  )
}

/* ============================================================
   STEPPER DE ESTADO
============================================================ */
function EstadoStepper({ estado }: { estado: EstadoPedido }) {
  const pasos: EstadoPedido[] = ["pendiente", "pagado", "enviado", "entregado"]
  if (estado === "cancelado") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
        <AlertCircle className="size-4 text-red-500" />
        <span className="text-sm font-medium text-red-600">Pedido cancelado</span>
      </div>
    )
  }
  const idx = pasos.indexOf(estado)
  return (
    <div className="flex items-center gap-1">
      {pasos.map((paso, i) => {
        const cfg = ESTADO_CONFIG[paso]
        const Icon = cfg.icon
        const activo = i === idx
        const completado = i < idx
        return (
          <React.Fragment key={paso}>
            <div className={`flex flex-col items-center gap-1 ${i > idx ? "opacity-35" : ""}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all
                ${activo ? "border-primary bg-primary text-primary-foreground" : ""}
                ${completado ? "border-emerald-500 bg-emerald-500 text-white" : ""}
                ${i > idx ? "border-muted bg-muted" : ""}
              `}>
                <Icon className="size-3.5" />
              </div>
              <span className={`text-xs font-medium whitespace-nowrap
                ${activo ? "text-primary" : completado ? "text-emerald-600" : "text-muted-foreground"}
              `}>
                {cfg.label}
              </span>
            </div>
            {i < pasos.length - 1 && (
              <div className={`h-0.5 w-8 mb-4 rounded-full transition-all
                ${i < idx ? "bg-emerald-400" : "bg-muted"}
              `} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

/* ============================================================
   MODAL DE DETALLE
============================================================ */
function DetallePedidoModal({
  pedido,
  onClose,
  onCambiarEstado,
}: {
  pedido: Pedido
  onClose: () => void
  onCambiarEstado: (id: string, estado: EstadoPedido) => void
}) {
  const cfg = ESTADO_CONFIG[pedido.estado]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <ShoppingBag className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold">{pedido.id}</h2>
              <p className="text-xs text-muted-foreground">{new Date(pedido.fecha).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted transition-colors">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* STEPPER */}
          <div className="flex justify-center py-2">
            <EstadoStepper estado={pedido.estado} />
          </div>

          {/* ACCIÓN DE ESTADO */}
          {cfg.siguiente && (
            <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="size-4" />
                Avanzar estado del pedido
              </div>
              <Button
                size="sm"
                onClick={() => onCambiarEstado(pedido.id, cfg.siguiente!)}
                className="gap-1.5"
              >
                {cfg.labelSiguiente}
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          )}
          {pedido.estado !== "cancelado" && pedido.estado !== "entregado" && (
            <button
              onClick={() => onCambiarEstado(pedido.id, "cancelado")}
              className="text-xs text-red-500 hover:underline"
            >
              Cancelar pedido
            </button>
          )}

          <Separator />

          {/* CLIENTE */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Información del cliente</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: User, label: pedido.cliente },
                { icon: Phone, label: pedido.telefono },
                { icon: MapPin, label: pedido.direccion },
                { icon: CreditCard, label: pedido.metodoPago },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-2 rounded-xl border bg-muted/20 px-3 py-2.5">
                  <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* PRODUCTOS */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Productos ({pedido.items.length})</p>
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-xs">Producto</TableHead>
                    <TableHead className="text-xs">Talla / Color</TableHead>
                    <TableHead className="text-xs text-right">Cant.</TableHead>
                    <TableHead className="text-xs text-right">Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedido.items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <p className="text-sm font-medium">{item.producto}</p>
                        <p className="text-xs text-muted-foreground">{item.sku}</p>
                      </TableCell>
                      <TableCell className="text-sm">{item.talla} / {item.color}</TableCell>
                      <TableCell className="text-sm text-right">{item.cantidad}</TableCell>
                      <TableCell className="text-sm text-right font-medium">S/ {(item.precio * item.cantidad).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* TOTALES */}
          <div className="rounded-xl border bg-muted/20 p-4 space-y-2">
            {[
              ["Subtotal", `S/ ${pedido.subtotal.toFixed(2)}`],
              ["Envío", `S/ ${pedido.envio.toFixed(2)}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm text-muted-foreground">
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>S/ {pedido.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t px-6 py-4">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PÁGINA PRINCIPAL
============================================================ */
export default function PedidosPage() {
  const [pedidos, setPedidos] = React.useState<Pedido[]>(mockPedidos)
  const [search, setSearch] = React.useState("")
  const [filtroEstado, setFiltroEstado] = React.useState("todos")
  const [viendo, setViendo] = React.useState<Pedido | null>(null)

  const filtrados = pedidos.filter(p => {
    const matchSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    const matchEstado = filtroEstado === "todos" || p.estado === filtroEstado
    return matchSearch && matchEstado
  })

  function cambiarEstado(id: string, nuevoEstado: EstadoPedido) {
    setPedidos(prev =>
      prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p)
    )
    setViendo(prev => prev?.id === id ? { ...prev, estado: nuevoEstado } : prev)
  }

  // Stats
  const stats = {
    total: pedidos.length,
    pendiente: pedidos.filter(p => p.estado === "pendiente").length,
    pagado: pedidos.filter(p => p.estado === "pagado").length,
    enviado: pedidos.filter(p => p.estado === "enviado").length,
    entregado: pedidos.filter(p => p.estado === "entregado").length,
    cancelado: pedidos.filter(p => p.estado === "cancelado").length,
    ingresos: pedidos
      .filter(p => p.estado !== "cancelado")
      .reduce((a, p) => a + p.total, 0),
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pedidos</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Gestiona y actualiza el estado de los pedidos
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total pedidos", value: stats.total, color: "text-foreground" },
          { label: "Pendientes", value: stats.pendiente, color: "text-amber-600" },
          { label: "En camino", value: stats.enviado, color: "text-violet-600" },
          { label: "Ingresos totales", value: `S/ ${stats.ingresos.toFixed(2)}`, color: "text-emerald-600" },
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TABLA */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, cliente o email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-40 gap-1">
                <Filter className="size-3.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="pagado">Pagado</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wide pl-4">Pedido</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Cliente</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Fecha</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Items</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Total</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Pago</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Estado</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ShoppingBag className="size-10 opacity-30" />
                      <p className="text-sm">No se encontraron pedidos</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtrados.map(p => {
                  const cfg = ESTADO_CONFIG[p.estado]
                  return (
                    <TableRow key={p.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setViendo(p)}>
                      <TableCell className="pl-4">
                        <span className="font-mono text-sm font-semibold text-primary">{p.id}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{p.cliente}</p>
                          <p className="text-xs text-muted-foreground">{p.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(p.fecha).toLocaleDateString("es-PE", { day: "numeric", month: "short" })}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                          {p.items.length} {p.items.length === 1 ? "item" : "items"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">S/ {p.total.toFixed(2)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.metodoPago}</TableCell>
                      <TableCell><EstadoBadge estado={p.estado} /></TableCell>
                      <TableCell onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2" onClick={() => setViendo(p)}>
                              <Eye className="size-3.5" /> Ver detalle
                            </DropdownMenuItem>
                            {cfg.siguiente && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="gap-2"
                                  onClick={() => cambiarEstado(p.id, cfg.siguiente!)}
                                >
                                  <RefreshCw className="size-3.5" />
                                  {cfg.labelSiguiente}
                                </DropdownMenuItem>
                              </>
                            )}
                            {p.estado !== "cancelado" && p.estado !== "entregado" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="gap-2 text-red-600 focus:text-red-600"
                                  onClick={() => cambiarEstado(p.id, "cancelado")}
                                >
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

          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              {filtrados.length} de {pedidos.length} pedidos
            </p>
          </div>
        </CardContent>
      </Card>

      {/* MODAL */}
      {viendo && (
        <DetallePedidoModal
          pedido={viendo}
          onClose={() => setViendo(null)}
          onCambiarEstado={cambiarEstado}
        />
      )}
    </div>
  )
}