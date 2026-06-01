'use client'

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Share2, Truck, ShieldCheck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const producto = {
  id: 1,
  nombre: "Zapatilla Running Pro X",
  marca: "Nike",
  sku: "NK-RUN-001",
  precio: 299.90,
  precioOriginal: 349.90,
  descuento: 14,
  rating: 4.5,
  reseñas: 128,
  descripcion: "Zapatilla de alto rendimiento para running, con tecnología de amortiguación Pro y materiales transpirables para máxima comodidad.",
  caracteristicas: [
    "Peso ligero: 280g",
    "Plantilla Ortholite",
    "Suela de goma duradera",
    "Disponible en tallas: 38-44"
  ],
  imagenes: [
    "/img/zapatilla-1.jpg",
    "/img/zapatilla-1-2.jpg",
    "/img/zapatilla-1-3.jpg",
    "/img/zapatilla-1-4.jpg"
  ],
  variantes: [
    { talla: "38", color: "Negro", stock: 10 },
    { talla: "39", color: "Negro", stock: 8 },
    { talla: "40", color: "Blanco", stock: 12 },
    { talla: "41", color: "Rojo", stock: 5 }
  ]
}

export default function ProductoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Galería de imágenes */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-4">
              <div className="relative aspect-square mb-4">
                <Image
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {producto.imagenes.map((img, i) => (
                  <div key={i} className="border rounded-lg p-1 cursor-pointer hover:border-emerald-600">
                    <Image
                      src={img}
                      alt={`${producto.nombre} ${i + 1}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-emerald-700">{producto.marca}</p>
                <h1 className="text-2xl font-bold text-gray-800">{producto.nombre}</h1>
                <p className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">SKU: {producto.sku}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.floor(producto.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({producto.reseñas} reseñas)</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-emerald-700">S/ {producto.precio.toFixed(2)}</span>
                  <span className="text-lg text-gray-400 line-through">S/ {producto.precioOriginal.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">-{producto.descuento}%</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-sm mb-2">Descripcion</h3>
                <p className="text-sm text-gray-600">{producto.descripcion}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Caracteristicas</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {producto.caracteristicas.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-5 h-5" />
                <span>Envio gratis en pedidos mayor a S/ 100</span>
              </div>
            </div>
          </div>

          {/* Compra */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">Talla</label>
                <select className="w-full border rounded-lg px-3 py-2 mt-1 text-sm font-semibold">
                  {producto.variantes.map(v => (
                    <option key={`${v.talla}-${v.color}`}>{v.talla} - {v.color} (Stock: {v.stock})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500">Cantidad</label>
                <select className="w-full border rounded-lg px-3 py-2 mt-1 text-sm font-semibold">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3" asChild>
                  <Link href="/carrito">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar al carrito
                  </Link>
                </Button>

                <Button variant="outline" className="w-full font-semibold py-3">
                  <Heart className="w-4 h-4 mr-2" />
                  Agregar a favoritos
                </Button>
              </div>

              <Separator />

              <button className="flex items-center justify-center gap-2 w-full text-sm text-gray-600 hover:text-emerald-700">
                <Share2 className="w-4 h-4" />
                Compartir producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}