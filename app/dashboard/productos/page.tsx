"use client"

import * as React from "react"
import {
  Plus, Search, Edit, Trash2, Eye, X, Upload,
  Package, Tag, Palette, Ruler, ImageIcon,
  MoreHorizontal, Filter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type Variante = { id: number; talla: string; color: string; stock: number; precio: number }

type Producto = {
  id: number; nombre: string; categoria: string; marca: string
  precio: number; stock: number; estado: "activo" | "inactivo" | "agotado"
  imagenes: string[]; variantes: Variante[]; descripcion: string; sku: string
}

const mockProductos: Producto[] = [
  { id: 1, nombre: "Zapatilla Running Pro X", categoria: "Zapatillas", marca: "Nike",      precio: 299.90, stock: 45, estado: "activo",   imagenes: [], descripcion: "Zapatilla de alto rendimiento para running", sku: "NK-RUN-001",
    variantes: [{ id:1, talla:"38", color:"Negro", stock:10, precio:299.90 },{ id:2, talla:"39", color:"Negro", stock:8, precio:299.90 },{ id:3, talla:"40", color:"Blanco", stock:12, precio:299.90 },{ id:4, talla:"41", color:"Rojo", stock:15, precio:319.90 }] },
  { id: 2, nombre: "Sandalia Comfort Plus",   categoria: "Sandalias",  marca: "Adidas",    precio: 149.90, stock: 30, estado: "activo",   imagenes: [], descripcion: "Sandalia casual de máximo confort",           sku: "AD-SND-002",
    variantes: [{ id:5, talla:"36", color:"Beige", stock:10, precio:149.90 },{ id:6, talla:"37", color:"Marrón", stock:20, precio:149.90 }] },
  { id: 3, nombre: "Bota Casual Urban",       categoria: "Botas",      marca: "Timberland", precio: 399.90, stock: 0,  estado: "agotado",  imagenes: [], descripcion: "Bota urbana de cuero genuino",               sku: "TM-BOT-003", variantes: [] },
  { id: 4, nombre: "Mocasín Clásico",         categoria: "Mocasines",  marca: "Clarks",    precio: 259.90, stock: 12, estado: "activo",   imagenes: [], descripcion: "Mocasín de cuero para uso formal",           sku: "CL-MOC-004",
    variantes: [{ id:7, talla:"40", color:"Negro", stock:6, precio:259.90 },{ id:8, talla:"41", color:"Marrón", stock:6, precio:259.90 }] },
  { id: 5, nombre: "Deportivo Flex Air",      categoria: "Zapatillas", marca: "Puma",      precio: 189.90, stock: 8,  estado: "inactivo", imagenes: [], descripcion: "Calzado deportivo con tecnología Flex Air",   sku: "PM-DEP-005",
    variantes: [{ id:9, talla:"39", color:"Azul", stock:4, precio:189.90 },{ id:10, talla:"40", color:"Verde", stock:4, precio:189.90 }] },
]

const TALLAS    = ["35","36","37","38","39","40","41","42","43","44"]
const COLORES   = ["Negro","Blanco","Marrón","Beige","Rojo","Azul","Verde","Gris"]
const CATEGORIAS = ["Zapatillas","Sandalias","Botas","Mocasines","Deportivos"]
const MARCAS    = ["Nike","Adidas","Puma","Timberland","Clarks","Reebok"]

function EstadoBadge({ estado }: { estado: Producto["estado"] }) {
  const map = {
    activo:   "bg-[#FAFF00]/15 text-[#8a8f00] border-[#FAFF00]/60 dark:bg-[#FAFF00]/10 dark:text-[#d4d900] dark:border-[#FAFF00]/30",
    inactivo: "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
    agotado:  "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900",
  }
  const label = { activo: "Activo", inactivo: "Inactivo", agotado: "Agotado" }
  return (
    <span className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${map[estado]}`}>
      {label[estado]}
    </span>
  )
}

function ProductoModal({ producto, onClose, onSave }: {
  producto: Producto | null; onClose: () => void; onSave: (p: Producto) => void
}) {
  const isNew = !producto || !producto.id || producto.id === 0
  const [form, setForm] = React.useState<Producto>(producto ?? { id: Date.now(), nombre: "", categoria: "", marca: "", precio: 0, stock: 0, estado: "activo", imagenes: [], variantes: [], descripcion: "", sku: "" })
  const [activeTab, setActiveTab] = React.useState("general")
  const [newVariante, setNewVariante] = React.useState<Omit<Variante, "id">>({ talla: "", color: "", stock: 0, precio: 0 })

  function addVariante() {
    if (!newVariante.talla || !newVariante.color) return
    setForm(f => ({ ...f, variantes: [...f.variantes, { ...newVariante, id: Date.now() }] }))
    setNewVariante({ talla: "", color: "", stock: 0, precio: 0 })
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    Array.from(e.target.files ?? []).forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => setForm(f => ({ ...f, imagenes: [...f.imagenes, ev.target?.result as string] }))
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-none border-2 border-[#FAFF00] bg-white dark:bg-zinc-950 shadow-[6px_6px_0px_#FAFF00]">

        <div className="flex items-center justify-between bg-black px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-[#FAFF00]">
              <Package className="size-4 text-black" />
            </div>
            <h2 className="text-base font-black uppercase tracking-widest text-white">
              {isNew ? "Nuevo Producto" : "Editar Producto"}
            </h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="mx-0 mt-0 justify-start rounded-none border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-0 h-auto">
            {[
              { value: "general",   label: "General",   icon: <Tag className="size-3.5" /> },
              { value: "variantes", label: "Variantes", icon: <Ruler className="size-3.5" /> },
              { value: "imagenes",  label: "Imágenes",  icon: <ImageIcon className="size-3.5" /> },
            ].map(tab => (
              <button key={tab.value} onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-widest border-b-2 transition-colors
                  ${activeTab === tab.value ? "border-[#FAFF00] bg-white dark:bg-zinc-950 text-black dark:text-white" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 pb-6 bg-white dark:bg-zinc-950">

            <TabsContent value="general" className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">Nombre del producto</Label>
                  <Input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej: Zapatilla Running Pro"
                    className="rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0 font-semibold" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">SKU</Label>
                  <Input value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} placeholder="NK-RUN-001"
                    className="rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0 font-mono text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">Estado</Label>
                  <Select value={form.estado} onValueChange={v => setForm(f => ({ ...f, estado: v as Producto["estado"] }))}>
                    <SelectTrigger className="rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00]"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                      <SelectItem value="agotado">Agotado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">Categoría</Label>
                  <Select value={form.categoria} onValueChange={v => setForm(f => ({ ...f, categoria: v }))}>
                    <SelectTrigger className="rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00]"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                    <SelectContent className="rounded-none">{CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">Marca</Label>
                  <Select value={form.marca} onValueChange={v => setForm(f => ({ ...f, marca: v }))}>
                    <SelectTrigger className="rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00]"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                    <SelectContent className="rounded-none">{MARCAS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">Precio base (S/)</Label>
                  <Input type="number" value={form.precio} onChange={e => setForm(f => ({ ...f, precio: Number(e.target.value) }))} placeholder="0.00"
                    className="rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0 font-bold" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">Stock general</Label>
                  <Input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} placeholder="0"
                    className="rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0 font-bold" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-xs font-black uppercase tracking-wider text-zinc-500">Descripción</Label>
                  <textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                    placeholder="Descripción del producto..." rows={3}
                    className="w-full rounded-none border-2 border-zinc-200 dark:border-zinc-700 bg-background px-3 py-2 text-sm outline-none focus:border-[#FAFF00] resize-none transition-colors" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variantes" className="mt-5 space-y-4">
              <div className="border-2 border-zinc-200 dark:border-zinc-700 p-4 space-y-3 bg-zinc-50 dark:bg-zinc-900">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Agregar variante</p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Talla", content: <Select value={newVariante.talla} onValueChange={v => setNewVariante(n => ({ ...n, talla: v }))}><SelectTrigger className="h-8 text-xs rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00]"><SelectValue placeholder="—" /></SelectTrigger><SelectContent className="rounded-none">{TALLAS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select> },
                    { label: "Color", content: <Select value={newVariante.color} onValueChange={v => setNewVariante(n => ({ ...n, color: v }))}><SelectTrigger className="h-8 text-xs rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00]"><SelectValue placeholder="—" /></SelectTrigger><SelectContent className="rounded-none">{COLORES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select> },
                    { label: "Stock", content: <Input type="number" className="h-8 text-xs rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0" value={newVariante.stock} onChange={e => setNewVariante(n => ({ ...n, stock: Number(e.target.value) }))} /> },
                    { label: "Precio (S/)", content: <Input type="number" className="h-8 text-xs rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0" value={newVariante.precio} onChange={e => setNewVariante(n => ({ ...n, precio: Number(e.target.value) }))} /> },
                  ].map(field => (
                    <div key={field.label} className="space-y-1">
                      <Label className="text-xs font-bold uppercase tracking-wide text-zinc-400">{field.label}</Label>
                      {field.content}
                    </div>
                  ))}
                </div>
                <button onClick={addVariante}
                  className="flex items-center gap-1.5 bg-[#FAFF00] px-4 py-2 text-xs font-black uppercase tracking-widest text-black hover:bg-yellow-300 transition-colors">
                  <Plus className="size-3.5" /> Agregar
                </button>
              </div>

              {form.variantes.length === 0 ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-700 py-12 text-zinc-400">
                  <Ruler className="size-8 mb-2 opacity-30" />
                  <p className="text-xs font-bold uppercase tracking-widest">Sin variantes</p>
                </div>
              ) : (
                <div className="border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-black hover:bg-black">
                        {["Talla","Color","Stock","Precio",""].map(h => <TableHead key={h} className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">{h}</TableHead>)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {form.variantes.map(v => (
                        <TableRow key={v.id} className="border-b border-zinc-100 dark:border-zinc-800">
                          <TableCell className="text-sm font-black">{v.talla}</TableCell>
                          <TableCell><div className="flex items-center gap-2"><Palette className="size-3.5 text-zinc-400" /><span className="text-sm font-semibold">{v.color}</span></div></TableCell>
                          <TableCell><span className={`text-sm font-black ${v.stock === 0 ? "text-red-500" : "text-emerald-600"}`}>{v.stock}</span></TableCell>
                          <TableCell className="text-sm font-bold">S/ {v.precio.toFixed(2)}</TableCell>
                          <TableCell>
                            <button onClick={() => setForm(f => ({ ...f, variantes: f.variantes.filter(x => x.id !== v.id) }))}
                              className="p-1.5 hover:bg-red-50 hover:text-red-500 transition-colors text-zinc-400"><X className="size-3.5" /></button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="imagenes" className="mt-5 space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 py-14 gap-3 cursor-pointer hover:border-[#FAFF00] hover:bg-[#FAFF00]/5 transition-colors"
                onClick={() => document.getElementById("img-upload")?.click()}>
                <div className="flex h-12 w-12 items-center justify-center bg-black">
                  <Upload className="size-5 text-[#FAFF00]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black uppercase tracking-widest">Arrastra imágenes aquí</p>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">PNG, JPG, WEBP · Máx. 5MB</p>
                </div>
                <button type="button" className="flex items-center gap-1.5 border-2 border-black dark:border-white px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                  <ImageIcon className="size-3.5" /> Seleccionar archivos
                </button>
                <input id="img-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
              {form.imagenes.length === 0 ? (
                <p className="text-center text-xs font-bold uppercase tracking-widest text-zinc-400">Sin imágenes</p>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {form.imagenes.map((img, i) => (
                    <div key={i} className="group relative aspect-square overflow-hidden border-2 border-zinc-200 dark:border-zinc-700">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      <button onClick={() => setForm(f => ({ ...f, imagenes: f.imagenes.filter((_, j) => j !== i) }))}
                        className="absolute right-1.5 top-1.5 bg-black p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="size-3 text-[#FAFF00]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex items-center justify-end gap-3 border-t-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-6 py-4">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest border-2 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Cancelar
          </button>
          <button onClick={() => onSave(form)}
            className="flex items-center gap-2 bg-[#FAFF00] px-5 py-2.5 text-xs font-black uppercase tracking-widest text-black hover:bg-yellow-300 transition-colors">
            {isNew ? <><Plus className="size-3.5" /> Crear Producto</> : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  )
}

function DetalleModal({ producto, onClose }: { producto: Producto; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-none border-2 border-[#FAFF00] bg-white dark:bg-zinc-950 shadow-[6px_6px_0px_#FAFF00]">
        <div className="flex items-center justify-between bg-black px-6 py-4">
          <h2 className="text-base font-black uppercase tracking-widest text-white truncate pr-4">{producto.nombre}</h2>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {([
              ["SKU",       producto.sku],
              ["Categoría", producto.categoria || "—"],
              ["Marca",     producto.marca || "—"],
              ["Precio",    `S/ ${producto.precio.toFixed(2)}`],
              ["Stock",     String(producto.stock)],
              ["Estado",    <EstadoBadge key="e" estado={producto.estado} />],
            ] as [string, React.ReactNode][]).map(([k, v]) => (
              <div key={String(k)} className="space-y-1 border-l-2 border-[#FAFF00] pl-3">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">{k}</p>
                <p className="font-bold text-sm">{v}</p>
              </div>
            ))}
          </div>
          {producto.descripcion && (
            <div className="border-l-2 border-[#FAFF00] pl-3">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Descripción</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{producto.descripcion}</p>
            </div>
          )}
          {producto.variantes.length > 0 && (
            <>
              <Separator className="border-zinc-200 dark:border-zinc-800" />
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-500">
                  Variantes <span className="text-[#8a8f00] dark:text-[#d4d900]">({producto.variantes.length})</span>
                </p>
                <div className="border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-black hover:bg-black">
                        {["Talla","Color","Stock","Precio"].map(h => <TableHead key={h} className="text-xs font-black uppercase tracking-widest text-[#FAFF00]">{h}</TableHead>)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {producto.variantes.map(v => (
                        <TableRow key={v.id} className="border-b border-zinc-100 dark:border-zinc-800">
                          <TableCell className="text-sm font-black">{v.talla}</TableCell>
                          <TableCell className="text-sm font-semibold">{v.color}</TableCell>
                          <TableCell className={`text-sm font-black ${v.stock === 0 ? "text-red-500" : "text-emerald-600"}`}>{v.stock}</TableCell>
                          <TableCell className="text-sm font-bold">S/ {v.precio.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
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
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    const matchCat = filtroCategoria === "todos" || p.categoria === filtroCategoria
    const matchEst = filtroEstado === "todos" || p.estado === filtroEstado
    return matchSearch && matchCat && matchEst
  })

  function handleSave(p: Producto) {
    setProductos(prev => prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p])
    setModalOpen(false); setEditando(null)
  }
  function handleDelete(id: number) {
    if (!confirm("¿Eliminar este producto?")) return
    setProductos(prev => prev.filter(p => p.id !== id))
    setSeleccionados(prev => prev.filter(s => s !== id))
  }
  function handleDeleteSeleccionados() {
    if (!confirm(`¿Eliminar ${seleccionados.length} productos?`)) return
    setProductos(prev => prev.filter(p => !seleccionados.includes(p.id)))
    setSeleccionados([])
  }
  function toggleSeleccion(id: number) { setSeleccionados(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]) }
  function toggleTodos() { setSeleccionados(prev => prev.length === filtrados.length ? [] : filtrados.map(p => p.id)) }

  const totalStock    = productos.reduce((a, p) => a + p.stock, 0)
  const totalActivos  = productos.filter(p => p.estado === "activo").length
  const totalAgotados = productos.filter(p => p.estado === "agotado").length

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-950 min-h-screen">

      <div className="flex items-center justify-between border-b-4 border-[#FAFF00] pb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-8 w-1.5 bg-[#FAFF00]" />
            <h1 className="text-3xl font-black uppercase tracking-tight">Productos</h1>
          </div>
          <p className="text-sm text-zinc-500 font-medium pl-4">Gestiona el catálogo de productos, variantes e imágenes</p>
        </div>
        <button onClick={() => { setEditando(null); setModalOpen(true) }}
          className="flex items-center gap-2 bg-[#FAFF00] px-5 py-3 text-sm font-black uppercase tracking-widest text-black hover:bg-yellow-300 active:scale-95 transition-all">
          <Plus className="size-4" /> Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total productos", value: productos.length,  accent: "border-zinc-900 dark:border-white" },
          { label: "Activos",         value: totalActivos,       accent: "border-emerald-500" },
          { label: "Agotados",        value: totalAgotados,      accent: "border-red-500" },
          { label: "Stock total",     value: totalStock,         accent: "border-[#FAFF00]" },
        ].map(s => (
          <div key={s.label} className={`border-2 ${s.accent} bg-white dark:bg-zinc-900 p-4`}>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">{s.label}</p>
            <p className="text-3xl font-black tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="border-2 border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-2 border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <Input placeholder="Buscar nombre o SKU..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus-visible:border-[#FAFF00] focus-visible:ring-0 text-sm font-medium bg-white dark:bg-zinc-950" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-40 rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00] text-xs font-bold uppercase bg-white dark:bg-zinc-950">
                <Filter className="size-3.5 mr-1 text-zinc-400" /><SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="todos">Todas</SelectItem>
                {CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-36 rounded-none border-2 border-zinc-200 dark:border-zinc-700 focus:ring-0 focus:border-[#FAFF00] text-xs font-bold uppercase bg-white dark:bg-zinc-950">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="todos">Todo estado</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="agotado">Agotado</SelectItem>
              </SelectContent>
            </Select>
            {seleccionados.length > 0 && (
              <button onClick={handleDeleteSeleccionados}
                className="flex items-center gap-1.5 bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-red-700 transition-colors">
                <Trash2 className="size-3.5" /> Eliminar ({seleccionados.length})
              </button>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-black hover:bg-black border-none">
              <TableHead className="w-10 pl-4">
                <Checkbox checked={seleccionados.length === filtrados.length && filtrados.length > 0} onCheckedChange={toggleTodos}
                  className="border-zinc-600 data-[state=checked]:bg-[#FAFF00] data-[state=checked]:border-[#FAFF00] data-[state=checked]:text-black" />
              </TableHead>
              {["Producto","Categoría","Marca","Precio","Stock","Variantes","Estado",""].map(h => (
                <TableHead key={h} className="text-xs font-black uppercase tracking-widest text-[#FAFF00] py-3.5">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-zinc-400">
                    <Package className="size-12 opacity-20" />
                    <p className="text-xs font-black uppercase tracking-widest">Sin resultados</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtrados.map(p => (
                <TableRow key={p.id}
                  className={`border-b border-zinc-100 dark:border-zinc-800 transition-colors ${seleccionados.includes(p.id) ? "bg-[#FAFF00]/5" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}>
                  <TableCell className="pl-4">
                    <Checkbox checked={seleccionados.includes(p.id)} onCheckedChange={() => toggleSeleccion(p.id)}
                      className="data-[state=checked]:bg-[#FAFF00] data-[state=checked]:border-[#FAFF00] data-[state=checked]:text-black" />
                  </TableCell>
                  <TableCell>
                    <p className="font-black text-sm leading-tight">{p.nombre}</p>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{p.sku}</p>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">{p.categoria || "—"}</TableCell>
                  <TableCell className="text-sm font-bold text-zinc-600 dark:text-zinc-300">{p.marca || "—"}</TableCell>
                  <TableCell><span className="text-sm font-black">S/ {p.precio.toFixed(2)}</span></TableCell>
                  <TableCell>
                    <span className={`text-sm font-black ${p.stock === 0 ? "text-red-500" : p.stock < 10 ? "text-amber-500" : "text-emerald-600"}`}>{p.stock}</span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-black">{p.variantes.length}</span>
                  </TableCell>
                  <TableCell><EstadoBadge estado={p.estado} /></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-none border-2 border-zinc-200 dark:border-zinc-700 p-0 shadow-[4px_4px_0px_#FAFF00]">
                        <DropdownMenuItem className="gap-2 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wide" onClick={() => setViendo(p)}>
                          <Eye className="size-3.5" /> Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wide" onClick={() => { setEditando(p); setModalOpen(true) }}>
                          <Edit className="size-3.5" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-0 border-zinc-200 dark:border-zinc-700" />
                        <DropdownMenuItem className="gap-2 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(p.id)}>
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

        <div className="flex items-center justify-between border-t-2 border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50 dark:bg-zinc-900">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {filtrados.length} de {productos.length} productos
            {seleccionados.length > 0 && <span className="ml-2 text-[#8a8f00] dark:text-[#d4d900]">· {seleccionados.length} seleccionados</span>}
          </p>
        </div>
      </div>

      {modalOpen && <ProductoModal producto={editando} onClose={() => { setModalOpen(false); setEditando(null) }} onSave={handleSave} />}
      {viendo && <DetalleModal producto={viendo} onClose={() => setViendo(null)} />}
    </div>
  )
}