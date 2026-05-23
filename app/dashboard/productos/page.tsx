"use client"

import * as React from "react"
import {
  Plus, Search, Edit, Trash2, Eye, X, Upload,
  Package, Tag, Palette, Ruler, ImageIcon, ChevronDown,
  MoreHorizontal, Filter, ArrowUpDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

/* ============================================================
   TIPOS
============================================================ */
type Variante = {
  id: number
  talla: string
  color: string
  stock: number
  precio: number
}

type Producto = {
  id: number
  nombre: string
  categoria: string
  marca: string
  precio: number
  stock: number
  estado: "activo" | "inactivo" | "agotado"
  imagenes: string[]
  variantes: Variante[]
  descripcion: string
  sku: string
}

/* ============================================================
   MOCK DATA
============================================================ */
const mockProductos: Producto[] = [
  {
    id: 1,
    nombre: "Zapatilla Running Pro X",
    categoria: "Zapatillas",
    marca: "Nike",
    precio: 299.90,
    stock: 45,
    estado: "activo",
    imagenes: [],
    descripcion: "Zapatilla de alto rendimiento para running",
    sku: "NK-RUN-001",
    variantes: [
      { id: 1, talla: "38", color: "Negro", stock: 10, precio: 299.90 },
      { id: 2, talla: "39", color: "Negro", stock: 8, precio: 299.90 },
      { id: 3, talla: "40", color: "Blanco", stock: 12, precio: 299.90 },
      { id: 4, talla: "41", color: "Rojo", stock: 15, precio: 319.90 },
    ],
  },
  {
    id: 2,
    nombre: "Sandalia Comfort Plus",
    categoria: "Sandalias",
    marca: "Adidas",
    precio: 149.90,
    stock: 30,
    estado: "activo",
    imagenes: [],
    descripcion: "Sandalia casual de máximo confort",
    sku: "AD-SND-002",
    variantes: [
      { id: 5, talla: "36", color: "Beige", stock: 10, precio: 149.90 },
      { id: 6, talla: "37", color: "Marrón", stock: 20, precio: 149.90 },
    ],
  },
  {
    id: 3,
    nombre: "Bota Casual Urban",
    categoria: "Botas",
    marca: "Timberland",
    precio: 399.90,
    stock: 0,
    estado: "agotado",
    imagenes: [],
    descripcion: "Bota urbana de cuero genuino",
    sku: "TM-BOT-003",
    variantes: [],
  },
  {
    id: 4,
    nombre: "Mocasín Clásico",
    categoria: "Mocasines",
    marca: "Clarks",
    precio: 259.90,
    stock: 12,
    estado: "activo",
    imagenes: [],
    descripcion: "Mocasín de cuero para uso formal",
    sku: "CL-MOC-004",
    variantes: [
      { id: 7, talla: "40", color: "Negro", stock: 6, precio: 259.90 },
      { id: 8, talla: "41", color: "Marrón", stock: 6, precio: 259.90 },
    ],
  },
  {
    id: 5,
    nombre: "Deportivo Flex Air",
    categoria: "Zapatillas",
    marca: "Puma",
    precio: 189.90,
    stock: 8,
    estado: "inactivo",
    imagenes: [],
    descripcion: "Calzado deportivo con tecnología Flex Air",
    sku: "PM-DEP-005",
    variantes: [
      { id: 9, talla: "39", color: "Azul", stock: 4, precio: 189.90 },
      { id: 10, talla: "40", color: "Verde", stock: 4, precio: 189.90 },
    ],
  },
]

const TALLAS = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"]
const COLORES = ["Negro", "Blanco", "Marrón", "Beige", "Rojo", "Azul", "Verde", "Gris"]
const CATEGORIAS = ["Zapatillas", "Sandalias", "Botas", "Mocasines", "Deportivos"]
const MARCAS = ["Nike", "Adidas", "Puma", "Timberland", "Clarks", "Reebok"]

/* ============================================================
   BADGE DE ESTADO
============================================================ */
function EstadoBadge({ estado }: { estado: Producto["estado"] }) {
  const map = {
    activo: "bg-emerald-100 text-emerald-700 border-emerald-200",
    inactivo: "bg-slate-100 text-slate-600 border-slate-200",
    agotado: "bg-red-100 text-red-600 border-red-200",
  }
  const label = { activo: "Activo", inactivo: "Inactivo", agotado: "Agotado" }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${map[estado]}`}>
      {label[estado]}
    </span>
  )
}

/* ============================================================
   MODAL DE PRODUCTO (crear / editar)
============================================================ */
function ProductoModal({
  producto,
  onClose,
  onSave,
}: {
  producto: Producto | null
  onClose: () => void
  onSave: (p: Producto) => void
}) {
  const isNew = !producto
  const [form, setForm] = React.useState<Producto>(
    producto ?? {
      id: Date.now(),
      nombre: "",
      categoria: "",
      marca: "",
      precio: 0,
      stock: 0,
      estado: "activo",
      imagenes: [],
      variantes: [],
      descripcion: "",
      sku: "",
    }
  )
  const [activeTab, setActiveTab] = React.useState("general")
  const [newVariante, setNewVariante] = React.useState<Omit<Variante, "id">>({
    talla: "", color: "", stock: 0, precio: 0,
  })

  function addVariante() {
    if (!newVariante.talla || !newVariante.color) return
    setForm(f => ({
      ...f,
      variantes: [...f.variantes, { ...newVariante, id: Date.now() }],
    }))
    setNewVariante({ talla: "", color: "", stock: 0, precio: 0 })
  }

  function removeVariante(id: number) {
    setForm(f => ({ ...f, variantes: f.variantes.filter(v => v.id !== id) }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">
              {isNew ? "Nuevo Producto" : "Editar Producto"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-muted transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="mx-6 mt-4 justify-start rounded-xl bg-muted/60 p-1">
            <TabsTrigger value="general" className="rounded-lg gap-1.5">
              <Tag className="size-3.5" /> General
            </TabsTrigger>
            <TabsTrigger value="variantes" className="rounded-lg gap-1.5">
              <Ruler className="size-3.5" /> Variantes
            </TabsTrigger>
            <TabsTrigger value="imagenes" className="rounded-lg gap-1.5">
              <ImageIcon className="size-3.5" /> Imágenes
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* ---- GENERAL ---- */}
            <TabsContent value="general" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label>Nombre del producto</Label>
                  <Input
                    value={form.nombre}
                    onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                    placeholder="Ej: Zapatilla Running Pro"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>SKU</Label>
                  <Input
                    value={form.sku}
                    onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                    placeholder="Ej: NK-RUN-001"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Estado</Label>
                  <Select
                    value={form.estado}
                    onValueChange={v => setForm(f => ({ ...f, estado: v as Producto["estado"] }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                      <SelectItem value="agotado">Agotado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Categoría</Label>
                  <Select
                    value={form.categoria}
                    onValueChange={v => setForm(f => ({ ...f, categoria: v }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Marca</Label>
                  <Select
                    value={form.marca}
                    onValueChange={v => setForm(f => ({ ...f, marca: v }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                    <SelectContent>
                      {MARCAS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Precio base (S/)</Label>
                  <Input
                    type="number"
                    value={form.precio}
                    onChange={e => setForm(f => ({ ...f, precio: Number(e.target.value) }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Stock general</Label>
                  <Input
                    type="number"
                    value={form.stock}
                    onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label>Descripción</Label>
                  <textarea
                    value={form.descripcion}
                    onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                    placeholder="Descripción del producto..."
                    rows={3}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                  />
                </div>
              </div>
            </TabsContent>

            {/* ---- VARIANTES ---- */}
            <TabsContent value="variantes" className="mt-4 space-y-4">
              {/* Agregar variante */}
              <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
                <p className="text-sm font-medium">Agregar variante</p>
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Talla</Label>
                    <Select
                      value={newVariante.talla}
                      onValueChange={v => setNewVariante(n => ({ ...n, talla: v }))}
                    >
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Talla" /></SelectTrigger>
                      <SelectContent>
                        {TALLAS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Color</Label>
                    <Select
                      value={newVariante.color}
                      onValueChange={v => setNewVariante(n => ({ ...n, color: v }))}
                    >
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Color" /></SelectTrigger>
                      <SelectContent>
                        {COLORES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Stock</Label>
                    <Input
                      type="number"
                      className="h-8 text-xs"
                      value={newVariante.stock}
                      onChange={e => setNewVariante(n => ({ ...n, stock: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Precio (S/)</Label>
                    <Input
                      type="number"
                      className="h-8 text-xs"
                      value={newVariante.precio}
                      onChange={e => setNewVariante(n => ({ ...n, precio: Number(e.target.value) }))}
                    />
                  </div>
                </div>
                <Button size="sm" onClick={addVariante} className="gap-1.5">
                  <Plus className="size-3.5" /> Agregar
                </Button>
              </div>

              {/* Lista variantes */}
              {form.variantes.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-muted-foreground">
                  <Ruler className="size-8 mb-2 opacity-40" />
                  <p className="text-sm">No hay variantes aún</p>
                </div>
              ) : (
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="text-xs">Talla</TableHead>
                        <TableHead className="text-xs">Color</TableHead>
                        <TableHead className="text-xs">Stock</TableHead>
                        <TableHead className="text-xs">Precio</TableHead>
                        <TableHead className="text-xs w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {form.variantes.map(v => (
                        <TableRow key={v.id}>
                          <TableCell className="text-sm font-medium">{v.talla}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Palette className="size-3.5 text-muted-foreground" />
                              <span className="text-sm">{v.color}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`text-sm font-medium ${v.stock === 0 ? "text-red-500" : "text-emerald-600"}`}>
                              {v.stock}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm">S/ {v.precio.toFixed(2)}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => removeVariante(v.id)}
                              className="rounded-lg p-1 hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              <X className="size-3.5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* ---- IMÁGENES ---- */}
            <TabsContent value="imagenes" className="mt-4 space-y-4">
              <div
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-muted/20 py-14 gap-3 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => document.getElementById("img-upload")?.click()}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="size-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Arrastra imágenes aquí</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP · Máx. 5MB por imagen</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ImageIcon className="size-3.5" /> Seleccionar archivos
                </Button>
                <input id="img-upload" type="file" multiple accept="image/*" className="hidden" />
              </div>

              {form.imagenes.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground">
                  No hay imágenes subidas
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {form.imagenes.map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border bg-muted">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      <button
                        onClick={() => setForm(f => ({ ...f, imagenes: f.imagenes.filter((_, j) => j !== i) }))}
                        className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="size-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(form)} className="gap-1.5">
            {isNew ? <><Plus className="size-4" /> Crear Producto</> : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   MODAL DE DETALLE (ver)
============================================================ */
function DetalleModal({ producto, onClose }: { producto: Producto; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">{producto.nombre}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted transition-colors">
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["SKU", producto.sku],
              ["Categoría", producto.categoria],
              ["Marca", producto.marca],
              ["Precio", `S/ ${producto.precio.toFixed(2)}`],
              ["Stock", producto.stock],
              ["Estado", <EstadoBadge key="e" estado={producto.estado} />],
            ].map(([k, v]) => (
              <div key={String(k)} className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{k}</p>
                <p className="font-medium">{v as React.ReactNode}</p>
              </div>
            ))}
            <div className="col-span-2 space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Descripción</p>
              <p>{producto.descripcion || "—"}</p>
            </div>
          </div>

          {producto.variantes.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="mb-3 text-sm font-semibold">Variantes ({producto.variantes.length})</p>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="text-xs">Talla</TableHead>
                        <TableHead className="text-xs">Color</TableHead>
                        <TableHead className="text-xs">Stock</TableHead>
                        <TableHead className="text-xs">Precio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {producto.variantes.map(v => (
                        <TableRow key={v.id}>
                          <TableCell className="text-sm">{v.talla}</TableCell>
                          <TableCell className="text-sm">{v.color}</TableCell>
                          <TableCell className={`text-sm font-medium ${v.stock === 0 ? "text-red-500" : "text-emerald-600"}`}>{v.stock}</TableCell>
                          <TableCell className="text-sm">S/ {v.precio.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
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
export default function ProductosPage() {
  const [productos, setProductos] = React.useState<Producto[]>(mockProductos)
  const [search, setSearch] = React.useState("")
  const [filtroCategoria, setFiltroCategoria] = React.useState("todos")
  const [filtroEstado, setFiltroEstado] = React.useState("todos")
  const [modalOpen, setModalOpen] = React.useState(false)
  const [editando, setEditando] = React.useState<Producto | null>(null)
  const [viendo, setViendo] = React.useState<Producto | null>(null)
  const [seleccionados, setSeleccionados] = React.useState<number[]>([])

  const filtrados = productos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchCat = filtroCategoria === "todos" || p.categoria === filtroCategoria
    const matchEst = filtroEstado === "todos" || p.estado === filtroEstado
    return matchSearch && matchCat && matchEst
  })

  function handleSave(p: Producto) {
    setProductos(prev =>
      prev.find(x => x.id === p.id)
        ? prev.map(x => x.id === p.id ? p : x)
        : [...prev, p]
    )
    setModalOpen(false)
    setEditando(null)
  }

  function handleDelete(id: number) {
    if (confirm("¿Eliminar este producto?")) {
      setProductos(prev => prev.filter(p => p.id !== id))
      setSeleccionados(prev => prev.filter(s => s !== id))
    }
  }

  function handleDeleteSeleccionados() {
    if (confirm(`¿Eliminar ${seleccionados.length} productos?`)) {
      setProductos(prev => prev.filter(p => !seleccionados.includes(p.id)))
      setSeleccionados([])
    }
  }

  function toggleSeleccion(id: number) {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  function toggleTodos() {
    setSeleccionados(prev =>
      prev.length === filtrados.length ? [] : filtrados.map(p => p.id)
    )
  }

  const totalStock = productos.reduce((a, p) => a + p.stock, 0)
  const totalActivos = productos.filter(p => p.estado === "activo").length
  const totalAgotados = productos.filter(p => p.estado === "agotado").length

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gestiona el catálogo de productos, variantes e imágenes
          </p>
        </div>
        <Button
          onClick={() => { setEditando(null); setModalOpen(true) }}
          className="gap-2"
        >
          <Plus className="size-4" /> Nuevo Producto
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total productos", value: productos.length, color: "text-foreground" },
          { label: "Activos", value: totalActivos, color: "text-emerald-600" },
          { label: "Agotados", value: totalAgotados, color: "text-red-500" },
          { label: "Stock total", value: totalStock, color: "text-blue-600" },
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FILTROS + TABLA */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* BÚSQUEDA */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o SKU..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* FILTROS */}
            <div className="flex items-center gap-2">
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-36 gap-1">
                  <Filter className="size-3.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  {CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todo estado</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="agotado">Agotado</SelectItem>
                </SelectContent>
              </Select>

              {seleccionados.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSeleccionados}
                  className="gap-1.5"
                >
                  <Trash2 className="size-3.5" />
                  Eliminar ({seleccionados.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="rounded-b-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-10 pl-4">
                    <Checkbox
                      checked={seleccionados.length === filtrados.length && filtrados.length > 0}
                      onCheckedChange={toggleTodos}
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Producto</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Categoría</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Marca</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Precio</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Stock</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Variantes</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Estado</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Package className="size-10 opacity-30" />
                        <p className="text-sm">No se encontraron productos</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtrados.map(p => (
                    <TableRow
                      key={p.id}
                      className={seleccionados.includes(p.id) ? "bg-primary/5" : ""}
                    >
                      <TableCell className="pl-4">
                        <Checkbox
                          checked={seleccionados.includes(p.id)}
                          onCheckedChange={() => toggleSeleccion(p.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{p.nombre}</p>
                          <p className="text-xs text-muted-foreground">{p.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{p.categoria || "—"}</TableCell>
                      <TableCell className="text-sm">{p.marca || "—"}</TableCell>
                      <TableCell className="text-sm font-medium">S/ {p.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${p.stock === 0 ? "text-red-500" : p.stock < 10 ? "text-amber-500" : "text-emerald-600"}`}>
                          {p.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                          {p.variantes.length}
                        </span>
                      </TableCell>
                      <TableCell><EstadoBadge estado={p.estado} /></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => setViendo(p)}
                            >
                              <Eye className="size-3.5" /> Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => { setEditando(p); setModalOpen(true) }}
                            >
                              <Edit className="size-3.5" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="gap-2 text-red-600 focus:text-red-600"
                              onClick={() => handleDelete(p.id)}
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
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              {filtrados.length} de {productos.length} productos
              {seleccionados.length > 0 && ` · ${seleccionados.length} seleccionados`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* MODALES */}
      {modalOpen && (
        <ProductoModal
          producto={editando}
          onClose={() => { setModalOpen(false); setEditando(null) }}
          onSave={handleSave}
        />
      )}
      {viendo && (
        <DetalleModal
          producto={viendo}
          onClose={() => setViendo(null)}
        />
      )}
    </div>
  )
}