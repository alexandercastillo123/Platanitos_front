'use client'

import * as React from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type Producto = {
  id: number
  nombre: string
  precio: number
  precioOriginal: number
  descuento: number
  imagen: string
  marca: string
}

const productos: Producto[] = [
  { id: 1, nombre: "Mochila Deportiva", precio: 179.90, precioOriginal: 199.90, descuento: 10, imagen: "/img/accesorios-1.jpg", marca: "Nike" },
  { id: 2, nombre: "Calcetera Pack 3", precio: 49.90, precioOriginal: 69.90, descuento: 29, imagen: "/img/accesorios-2.jpg", marca: "Adidas" },
  { id: 3, nombre: "Gorra Running", precio: 59.90, precioOriginal: 79.90, descuento: 25, imagen: "/img/accesorios-3.jpg", marca: "Puma" },
  { id: 4, nombre: "Guantes Entrenamiento", precio: 89.90, precioOriginal: 109.90, descuento: 18, imagen: "/img/accesorios-4.jpg", marca: "Clarks" },
  { id: 5, nombre: "Toalla Deportiva", precio: 69.90, precioOriginal: 89.90, descuento: 22, imagen: "/img/accesorios-5.jpg", marca: "Reebok" },
  { id: 6, nombre: "Rodilleras Antideslizantes", precio: 79.90, precioOriginal: 99.90, descuento: 20, imagen: "/img/accesorios-6.jpg", marca: "Nike" },
  { id: 7, nombre: "Protector Plantillas", precio: 29.90, precioOriginal: 39.90, descuento: 25, imagen: "/img/accesorios-7.jpg", marca: "Adidas" },
  { id: 8, nombre: "Calcetines Deportivos Pack 5", precio: 39.90, precioOriginal: 49.90, descuento: 20, imagen: "/img/accesorios-8.jpg", marca: "Puma" },
]

export default function AccesoriosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Accesorios</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Filtrar</Button>
            <select className="border rounded px-3 py-1 text-sm">
              <option>Ordenar: Más relevantes</option>
              <option>Menor precio</option>
              <option>Mayor precio</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productos.map((p) => (
            <Link href="/producto" key={p.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  {p.descuento > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">-{p.descuento}%</span>
                  )}
                </div>

                <div className="p-3 space-y-1">
                  <p className="text-xs text-gray-500 font-medium">{p.marca}</p>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{p.nombre}</h3>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-700">S/ {p.precio.toFixed(2)}</span>
                    {p.precioOriginal > p.precio && (
                      <span className="text-xs text-gray-400 line-through">S/ {p.precioOriginal.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}