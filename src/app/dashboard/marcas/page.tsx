"use client"

import * as React from "react"
import {
  Plus, Search, Edit, Trash2, X, Tag,
  MoreHorizontal, Globe, Check, LayoutGrid,
  List, TrendingUp, Building2, Package,
  ExternalLink, Power, ShieldOff,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Progress } from "@/components/ui/progress"

type Marca = {
  id: number
  nombre: string
  slug: string
  descripcion: string
  website: string
  estado: "activa" | "inactiva"
  productos: number
  logo: string
  ventas: number
}

const mockMarcas: Marca[] = [
  { id:1, nombre:"Nike",       slug:"nike",       descripcion:"Just Do It. Marca líder en calzado deportivo y ropa atlética.",    website:"https://nike.com",       estado:"activa",   productos:24, logo:"N", ventas:89 },
  { id:2, nombre:"Adidas",     slug:"adidas",     descripcion:"Impossible is Nothing. Calzado deportivo y casual de primera.",    website:"https://adidas.com",     estado:"activa",   productos:18, logo:"A", ventas:67 },
  { id:3, nombre:"Puma",       slug:"puma",       descripcion:"Forever Faster. Donde la moda se encuentra con el deporte.",       website:"https://puma.com",       estado:"activa",   productos:12, logo:"P", ventas:54 },
  { id:4, nombre:"Timberland", slug:"timberland", descripcion:"Calzado outdoor y botas de trabajo premium, durabilidad extrema.", website:"https://timberland.com", estado:"activa",   productos:9,  logo:"T", ventas:42 },
  { id:5, nombre:"Clarks",     slug:"clarks",     descripcion:"Calzado clásico y formal de alta calidad desde 1825.",            website:"https://clarks.com",     estado:"activa",   productos:7,  logo:"C", ventas:31 },
  { id:6, nombre:"Reebok",     slug:"reebok",     descripcion:"Be More Human. Calzado fitness y lifestyle para todos.",           website:"https://reebok.com",     estado:"inactiva", productos:3,  logo:"R", ventas:8  },
]

const LOGO_COLORS: Record<string, { bg: string; text: string }> = {
  N: { bg: "#111", text: "#FAFF00" },
  A: { bg: "#2563eb", text: "#fff" },
  P: { bg: "#dc2626", text: "#fff" },
  T: { bg: "#92400e", text: "#fff" },
  C: { bg: "#0891b2", text: "#fff" },
  R: { bg: "#7c3aed", text: "#fff" },
}

function getLogoStyle(letra: string) {
  return LOGO_COLORS[letra] ?? { bg: "#18181b", text: "#FAFF00" }
}

function generarSlug(nombre: string) {
  return nombre.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

function EstadoBadge({ estado }: { estado: Marca["estado"] }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider
      ${estado === "activa"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-gray-100 text-gray-500 border-gray-300"}`}>
      {estado === "activa"
        ? <><Check className="size-2.5" />Activa</>
        : <><ShieldOff className="size-2.5" />Inactiva</>}
    </span>
  )
}

function MarcaCard({
  marca, maxVentas,
  onEdit, onDelete, onToggle,
}: {
  marca: Marca
  maxVentas: number
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}) {
  const style = getLogoStyle(marca.logo)
  const pct = Math.round((marca.ventas / maxVentas) * 100)

  return (
    <div className={`relative border-2 bg-white flex flex-col overflow-hidden transition-all hover:shadow-lg
      ${marca.estado === "activa" ? "border-gray-200" : "border-gray-200 opacity-60"}`}>

      <div className="h-1.5 w-full" style={{ background: style.bg }} />

      <div className="p-5 flex-1 flex flex-col gap-4">

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center text-xl font-bold flex-shrink-0"
              style={{ background: style.bg, color: style.text }}>
              {marca.logo}
            </div>
            <div>
              <p className="font-semibold text-base leading-tight">{marca.nombre}</p>
              <span className="font-mono text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5">{marca.slug}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-7 w-7 items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 shadow-md">
              <DropdownMenuItem className="gap-2 px-3 py-2.5 text-xs font-medium" onClick={onEdit}>
                <Edit className="size-3.5" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 px-3 py-2.5 text-xs font-medium" onClick={onToggle}>
                <Power className="size-3.5" /> {marca.estado === "activa" ? "Desactivar" : "Activar"}
              </DropdownMenuItem>
              {marca.website && (
                <DropdownMenuItem className="gap-2 px-3 py-2.5 text-xs font-medium" asChild>
                  <a href={marca.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-3.5" /> Visitar web
                  </a>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="border-gray-200" />
              <DropdownMenuItem className="gap-2 px-3 py-2.5 text-xs font-medium text-red-600" onClick={onDelete}>
                <Trash2 className="size-3.5" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {marca.descripcion || "Sin descripción"}
        </p>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium uppercase text-gray-400">Ventas</span>
            <span className="text-xs font-semibold">{marca.ventas}</span>
          </div>
          <Progress value={pct} className="h-1.5 bg-gray-100 [&>div]:bg-emerald-600" />
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <Package className="size-3.5" />
            <span>{marca.productos} productos</span>
          </div>
          <EstadoBadge estado={marca.estado} />
        </div>
      </div>
    </div>
  )
}

function MarcaModal({ marca, onClose, onSave }: {
  marca: Marca | null
  onClose: () => void
  onSave: (m: Marca) => void
}) {
  const isNew = !marca
  const defaultMarca: Marca = { id: 0, nombre: "", slug: "", descripcion: "", website: "", estado: "activa", productos: 0, logo: "", ventas: 0 }
  const [form, setForm] = React.useState<Marca>(() => marca ?? defaultMarca)

  function handleNombre(nombre: string) {
    setForm(f => ({ ...f, nombre, slug: generarSlug(nombre), logo: nombre[0]?.toUpperCase() ?? "" }))
  }

  const style = getLogoStyle(form.logo || "?")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-xl">

        <div className="flex items-center justify-between bg-gray-900 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-emerald-600">
              <Tag className="size-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-white">
              {isNew ? "Nueva Marca" : `Editar: ${marca.nombre}`}
            </h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 bg-white">

          <div className="flex items-center gap-4 border-2 border-gray-100 bg-gray-50 p-4">
            <div className="flex h-14 w-14 items-center justify-center text-2xl font-bold flex-shrink-0"
              style={{ background: style.bg, color: style.text }}>
              {form.logo || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base truncate">{form.nombre || "Nombre de la marca"}</p>
              <p className="text-xs text-gray-400 font-mono">{form.slug || "slug-de-la-marca"}</p>
            </div>
            <EstadoBadge estado={form.estado} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase text-gray-500">Nombre *</Label>
              <Input value={form.nombre} onChange={e => handleNombre(e.target.value)} placeholder="Ej: Nike"
                className="border-gray-300 focus:border-emerald-500 font-medium" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase text-gray-500">Slug</Label>
              <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="nike"
                className="border-gray-300 focus:border-emerald-500 font-mono text-sm" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs font-medium uppercase text-gray-500">Descripción</Label>
              <textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                placeholder="Descripción breve de la marca..." rows={2}
                className="w-full border-2 border-gray-300 bg-background px-3 py-2 text-sm outline-none focus:border-emerald-500 resize-none transition-colors" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase text-gray-500">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
                <Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  placeholder="https://..." className="pl-8 border-gray-300 focus:border-emerald-500" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase text-gray-500">Estado</Label>
              <Select value={form.estado} onValueChange={v => setForm(f => ({ ...f, estado: v as Marca["estado"] }))}>
                <SelectTrigger className="border-gray-300 focus:ring-emerald-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="inactiva">Inactiva</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <button onClick={onClose}
            className="px-5 py-2.5 text-xs font-medium uppercase border border-gray-300 hover:bg-gray-100 transition-colors">
            Cancelar
          </button>
          <button onClick={() => onSave(form)} disabled={!form.nombre.trim()}
            className="flex items-center gap-2 bg-emerald-600 px-5 py-2.5 text-xs font-medium uppercase text-white hover:bg-emerald-700 transition-colors disabled:opacity-40">
            {isNew ? <><Plus className="size-3.5" /> Crear Marca</> : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MarcasPage() {
  const [marcas, setMarcas]           = React.useState<Marca[]>(mockMarcas)
  const [search, setSearch]           = React.useState("")
  const [filtroEstado, setFiltroEstado] = React.useState("todos")
  const [orden, setOrden]             = React.useState("nombre")
  const [vista, setVista]             = React.useState<"cards" | "tabla">("cards")
  const [modalOpen, setModalOpen]     = React.useState(false)
  const [editando, setEditando]       = React.useState<Marca | null>(null)

  const maxVentas = Math.max(...marcas.map(m => m.ventas), 1)

  const filtradas = marcas
    .filter(m => {
      const matchSearch  = m.nombre.toLowerCase().includes(search.toLowerCase()) || m.slug.toLowerCase().includes(search.toLowerCase())
      const matchEstado  = filtroEstado === "todos" || m.estado === filtroEstado
      return matchSearch && matchEstado
    })
    .sort((a, b) => {
      if (orden === "nombre")    return a.nombre.localeCompare(b.nombre)
      if (orden === "productos") return b.productos - a.productos
      if (orden === "ventas")    return b.ventas - a.ventas
      return 0
    })

  function handleSave(m: Marca) {
    setMarcas(prev => prev.find(x => x.id === m.id) ? prev.map(x => x.id === m.id ? m : x) : [...prev, m])
    setModalOpen(false); setEditando(null)
  }

  function handleDelete(id: number) {
    const marca = marcas.find(m => m.id === id)
    if (marca && marca.productos > 0) {
      alert(`No puedes eliminar "${marca.nombre}" porque tiene ${marca.productos} productos asociados.`)
      return
    }
    if (confirm("¿Eliminar esta marca?")) setMarcas(prev => prev.filter(m => m.id !== id))
  }

  function toggleEstado(id: number) {
    setMarcas(prev => prev.map(m => m.id === id ? { ...m, estado: m.estado === "activa" ? "inactiva" : "activa" } : m))
  }

  const totalActivas   = marcas.filter(m => m.estado === "activa").length
  const totalProductos = marcas.reduce((a, m) => a + m.productos, 0)
  const totalVentas    = marcas.reduce((a, m) => a + m.ventas, 0)

  return (
    <div className="space-y-6 min-h-screen">

      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-8 w-1.5 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" />
            <h1 className="text-2xl font-bold text-gray-800">
              Marcas
            </h1>
          </div>
          <p className="text-sm text-gray-500 font-medium pl-4">
            Gestiona las marcas del catálogo de productos
          </p>
        </div>
        <button
          onClick={() => { setEditando(null); setModalOpen(true) }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition-colors">
          <Plus className="size-4" /> Nueva Marca
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total marcas",    value: marcas.length,   Icon: Building2,  color: "text-gray-600" },
          { label: "Activas",         value: totalActivas,    Icon: Check,      color: "text-emerald-600" },
          { label: "Prod. cubiertos", value: totalProductos,  Icon: Package,    color: "text-blue-600" },
          { label: "Ventas totales",  value: totalVentas,     Icon: TrendingUp, color: "text-emerald-600" },
        ].map(s => (
          <Card key={s.label} className="border-l-4 border-l-gray-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
                <s.Icon className={`size-4 ${s.color}`} />
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 p-4 bg-gray-50">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input placeholder="Buscar marca o slug..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 border-gray-300 focus:border-emerald-500 text-sm" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-36 border-gray-300 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todo estado</SelectItem>
                <SelectItem value="activa">Activa</SelectItem>
                <SelectItem value="inactiva">Inactiva</SelectItem>
              </SelectContent>
            </Select>

            <Select value={orden} onValueChange={setOrden}>
              <SelectTrigger className="w-40 border-gray-300 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nombre">A → Z</SelectItem>
                <SelectItem value="productos">Más productos</SelectItem>
                <SelectItem value="ventas">Más ventas</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-gray-300">
              <button onClick={() => setVista("cards")}
                className={`flex h-9 w-9 items-center justify-center transition-colors
                  ${vista === "cards" ? "bg-emerald-100 text-emerald-700" : "bg-white text-gray-400 hover:text-gray-700"}`}>
                <LayoutGrid className="size-4" />
              </button>
              <button onClick={() => setVista("tabla")}
                className={`flex h-9 w-9 items-center justify-center transition-colors
                  ${vista === "tabla" ? "bg-emerald-100 text-emerald-700" : "bg-white text-gray-400 hover:text-gray-700"}`}>
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {filtradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 border-t">
            <Building2 className="size-12 opacity-20 mb-3" />
            <p className="text-xs font-medium uppercase">Sin resultados</p>
          </div>
        ) : vista === "cards" ? (

          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtradas.map(m => (
                <MarcaCard
                  key={m.id}
                  marca={m}
                  maxVentas={maxVentas}
                  onEdit={() => { setEditando(m); setModalOpen(true) }}
                  onDelete={() => handleDelete(m.id)}
                  onToggle={() => toggleEstado(m.id)}
                />
              ))}
            </div>
            <p className="text-xs font-medium text-gray-500 text-center mt-4">
              {filtradas.length} de {marcas.length} marcas
            </p>
          </div>

        ) : (

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-900 hover:bg-gray-900 border-none">
                {["Marca", "Slug", "Descripción", "Website", "Productos", "Ventas", "Estado", ""].map(h => (
                  <TableHead key={h} className="text-xs font-semibold uppercase tracking-wider text-emerald-400 py-3.5 first:pl-4">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.map(m => {
                const style = getLogoStyle(m.logo)
                return (
                  <TableRow key={m.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{ background: style.bg, color: style.text }}>
                          {m.logo}
                        </div>
                        <span className="font-semibold text-sm">{m.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1">{m.slug}</span>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500 max-w-[180px] truncate">{m.descripcion || "—"}</TableCell>
                    <TableCell>
                      {m.website
                        ? <a href={m.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
                            <Globe className="size-3" /> Visitar
                          </a>
                        : <span className="text-xs text-gray-400">—</span>}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center bg-gray-100 px-2.5 py-0.5 text-xs font-medium">{m.productos}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <Progress value={Math.round((m.ventas / maxVentas) * 100)}
                          className="h-1.5 w-14 bg-gray-100 [&>div]:bg-emerald-600" />
                        <span className="text-xs font-semibold">{m.ventas}</span>
                      </div>
                    </TableCell>
                    <TableCell><EstadoBadge estado={m.estado} /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex h-8 w-8 items-center justify-center hover:bg-gray-100 rounded transition-colors">
                            <MoreHorizontal className="size-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 shadow-md">
                          <DropdownMenuItem className="gap-2 px-3 py-2.5 text-xs font-medium"
                            onClick={() => { setEditando(m); setModalOpen(true) }}>
                            <Edit className="size-3.5" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 py-2.5 text-xs font-medium"
                            onClick={() => toggleEstado(m.id)}>
                            <Power className="size-3.5" /> {m.estado === "activa" ? "Desactivar" : "Activar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="border-gray-200" />
                          <DropdownMenuItem className="gap-2 px-3 py-2.5 text-xs font-medium text-red-600"
                            onClick={() => handleDelete(m.id)}>
                            <Trash2 className="size-3.5" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      {modalOpen && (
        <MarcaModal
          marca={editando}
          onClose={() => { setModalOpen(false); setEditando(null) }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}