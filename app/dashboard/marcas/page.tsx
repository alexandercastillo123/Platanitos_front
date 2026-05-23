"use client"

import * as React from "react"
import {
  Plus, Search, Edit, Trash2, X, Tag,
  MoreHorizontal, Globe, FileText, Check,
  Building2, TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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

/* ============================================================
   TIPOS
============================================================ */
type Marca = {
  id: number
  nombre: string
  slug: string
  descripcion: string
  website: string
  estado: "activa" | "inactiva"
  productos: number
  logo: string
}

/* ============================================================
   MOCK DATA
============================================================ */
const mockMarcas: Marca[] = [
  {
    id: 1, nombre: "Nike", slug: "nike",
    descripcion: "Just Do It. Marca líder en calzado deportivo.",
    website: "https://nike.com", estado: "activa", productos: 24, logo: "N",
  },
  {
    id: 2, nombre: "Adidas", slug: "adidas",
    descripcion: "Impossible is Nothing. Calzado deportivo y casual.",
    website: "https://adidas.com", estado: "activa", productos: 18, logo: "A",
  },
  {
    id: 3, nombre: "Puma", slug: "puma",
    descripcion: "Forever Faster. Moda y deporte.",
    website: "https://puma.com", estado: "activa", productos: 12, logo: "P",
  },
  {
    id: 4, nombre: "Timberland", slug: "timberland",
    descripcion: "Calzado outdoor y botas de trabajo premium.",
    website: "https://timberland.com", estado: "activa", productos: 9, logo: "T",
  },
  {
    id: 5, nombre: "Clarks", slug: "clarks",
    descripcion: "Calzado clásico y formal de alta calidad.",
    website: "https://clarks.com", estado: "activa", productos: 7, logo: "C",
  },
  {
    id: 6, nombre: "Reebok", slug: "reebok",
    descripcion: "Be More Human. Calzado fitness y lifestyle.",
    website: "https://reebok.com", estado: "inactiva", productos: 3, logo: "R",
  },
]

const COLORES_LOGO = [
  "bg-rose-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500",
  "bg-violet-500", "bg-cyan-500", "bg-orange-500", "bg-pink-500",
]

function getColorLogo(nombre: string) {
  const idx = nombre.charCodeAt(0) % COLORES_LOGO.length
  return COLORES_LOGO[idx]
}

function generarSlug(nombre: string) {
  return nombre.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

/* ============================================================
   BADGE ESTADO
============================================================ */
function EstadoBadge({ estado }: { estado: Marca["estado"] }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium
      ${estado === "activa"
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : "bg-slate-100 text-slate-500 border-slate-200"
      }`}>
      {estado === "activa" && <Check className="size-3" />}
      {estado === "activa" ? "Activa" : "Inactiva"}
    </span>
  )
}

/* ============================================================
   MODAL CREAR / EDITAR
============================================================ */
function MarcaModal({
  marca,
  onClose,
  onSave,
}: {
  marca: Marca | null
  onClose: () => void
  onSave: (m: Marca) => void
}) {
  const isNew = !marca
  const [form, setForm] = React.useState<Marca>(
    marca ?? {
      id: Date.now(),
      nombre: "",
      slug: "",
      descripcion: "",
      website: "",
      estado: "activa",
      productos: 0,
      logo: "",
    }
  )

  function handleNombre(nombre: string) {
    setForm(f => ({ ...f, nombre, slug: generarSlug(nombre) }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Tag className="size-5 text-primary" />
            </div>
            <h2 className="text-base font-semibold">
              {isNew ? "Nueva Marca" : `Editar: ${marca.nombre}`}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted transition-colors">
            <X className="size-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {/* Preview logo */}
          <div className="flex items-center gap-4 rounded-xl border bg-muted/30 p-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white ${getColorLogo(form.nombre || "?")}`}>
              {form.nombre ? form.nombre[0].toUpperCase() : "?"}
            </div>
            <div>
              <p className="font-semibold">{form.nombre || "Nombre de la marca"}</p>
              <p className="text-xs text-muted-foreground">{form.slug || "slug-de-la-marca"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Nombre *</Label>
              <Input
                value={form.nombre}
                onChange={e => handleNombre(e.target.value)}
                placeholder="Ej: Nike"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="nike"
                className="font-mono text-sm"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Descripción</Label>
              <textarea
                value={form.descripcion}
                onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                placeholder="Descripción breve de la marca..."
                rows={2}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  placeholder="https://..."
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select
                value={form.estado}
                onValueChange={v => setForm(f => ({ ...f, estado: v as Marca["estado"] }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="inactiva">Inactiva</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            onClick={() => onSave(form)}
            disabled={!form.nombre.trim()}
            className="gap-1.5"
          >
            {isNew ? <><Plus className="size-4" /> Crear Marca</> : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PÁGINA PRINCIPAL
============================================================ */
export default function MarcasPage() {
  const [marcas, setMarcas] = React.useState<Marca[]>(mockMarcas)
  const [search, setSearch] = React.useState("")
  const [filtroEstado, setFiltroEstado] = React.useState("todos")
  const [modalOpen, setModalOpen] = React.useState(false)
  const [editando, setEditando] = React.useState<Marca | null>(null)

  const filtradas = marcas.filter(m => {
    const matchSearch = m.nombre.toLowerCase().includes(search.toLowerCase()) ||
      m.slug.toLowerCase().includes(search.toLowerCase())
    const matchEstado = filtroEstado === "todos" || m.estado === filtroEstado
    return matchSearch && matchEstado
  })

  function handleSave(m: Marca) {
    setMarcas(prev =>
      prev.find(x => x.id === m.id)
        ? prev.map(x => x.id === m.id ? m : x)
        : [...prev, m]
    )
    setModalOpen(false)
    setEditando(null)
  }

  function handleDelete(id: number) {
    const marca = marcas.find(m => m.id === id)
    if (marca && marca.productos > 0) {
      alert(`No puedes eliminar "${marca.nombre}" porque tiene ${marca.productos} productos asociados.`)
      return
    }
    if (confirm("¿Eliminar esta marca?")) {
      setMarcas(prev => prev.filter(m => m.id !== id))
    }
  }

  function toggleEstado(id: number) {
    setMarcas(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, estado: m.estado === "activa" ? "inactiva" : "activa" }
          : m
      )
    )
  }

  const totalActivas = marcas.filter(m => m.estado === "activa").length
  const totalProductos = marcas.reduce((a, m) => a + m.productos, 0)

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marcas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gestiona las marcas del catálogo
          </p>
        </div>
        <Button
          onClick={() => { setEditando(null); setModalOpen(true) }}
          className="gap-2"
        >
          <Plus className="size-4" /> Nueva Marca
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total marcas", value: marcas.length, icon: Tag, color: "text-foreground" },
          { label: "Activas", value: totalActivas, icon: Check, color: "text-emerald-600" },
          { label: "Productos cubiertos", value: totalProductos, icon: TrendingUp, color: "text-blue-600" },
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <s.icon className={`size-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
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
                placeholder="Buscar marca..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todo estado</SelectItem>
                <SelectItem value="activa">Activa</SelectItem>
                <SelectItem value="inactiva">Inactiva</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wide pl-4">Marca</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Slug</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Descripción</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Website</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Productos</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">Estado</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Building2 className="size-10 opacity-30" />
                      <p className="text-sm">No se encontraron marcas</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtradas.map(m => (
                  <TableRow key={m.id}>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white shrink-0 ${getColorLogo(m.nombre)}`}>
                          {m.nombre[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-sm">{m.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">{m.slug}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {m.descripcion || "—"}
                    </TableCell>
                    <TableCell>
                      {m.website ? (
                        <a
                          href={m.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          <Globe className="size-3" />
                          Visitar
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                        {m.productos}
                      </span>
                    </TableCell>
                    <TableCell><EstadoBadge estado={m.estado} /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => { setEditando(m); setModalOpen(true) }}
                          >
                            <Edit className="size-3.5" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => toggleEstado(m.id)}
                          >
                            <Check className="size-3.5" />
                            {m.estado === "activa" ? "Desactivar" : "Activar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(m.id)}
                          >
                            <Trash2 className="size-3.5" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              {filtradas.length} de {marcas.length} marcas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* MODAL */}
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