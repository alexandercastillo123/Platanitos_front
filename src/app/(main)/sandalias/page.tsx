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
  { id: 1, nombre: "Sandalia Comfort Plus", precio: 149.90, precioOriginal: 179.90, descuento: 17, imagen: "/img/sandalias-1.jpg", marca: "Adidas" },
  { id: 2, nombre: "Sandalia Mujer Verano", precio: 129.90, precioOriginal: 149.90, descuento: 13, imagen: "/img/sandalias-2.jpg", marca: "Nike" },
  { id: 3, nombre: "Sandalia Hombre Sport", precio: 119.90, precioOriginal: 139.90, descuento: 14, imagen: "/img/sandalias-3.jpg", marca: "Puma" },
  { id: 4, nombre: "Sandalia Básica", precio: 89.90, precioOriginal: 109.90, descuento: 18, imagen: "/img/sandalias-4.jpg", marca: "Clarks" },
  { id: 5, nombre: "Sandalia Urbana", precio: 139.90, precioOriginal: 169.90, descuento: 18, imagen: "/img/sandalias-5.jpg", marca: "Reebok" },
  { id: 6, nombre: "Sandalia Playera", precio: 99.90, precioOriginal: 119.90, descuento: 17, imagen: "/img/sandalias-6.jpg", marca: "Adidas" },
]

export default function SandaliasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sandalias</h1>
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