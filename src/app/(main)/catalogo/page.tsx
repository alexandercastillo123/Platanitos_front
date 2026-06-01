'use client'

import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type Producto = {
    id: number
    nombre: string
    precio: number
    precioOriginal: number
    descuento: number
    imagen: string
    marca: string
    categoria: string
}

const productos: Producto[] = [
    { id: 1, nombre: "Zapatilla Running Pro X", precio: 299.90, precioOriginal: 349.90, descuento: 14, imagen: "/img/zapatilla-1.jpg", marca: "Nike", categoria: "zapatillas" },
    { id: 2, nombre: "Zapatilla Urbana Essential", precio: 249.90, precioOriginal: 299.90, descuento: 17, imagen: "/img/zapatilla-2.jpg", marca: "Adidas", categoria: "zapatillas" },
    { id: 3, nombre: "Sandalia Comfort Plus", precio: 149.90, precioOriginal: 179.90, descuento: 17, imagen: "/img/sandalias-1.jpg", marca: "Adidas", categoria: "sandalias" },
    { id: 4, nombre: "Polo Casual Hombre", precio: 89.90, precioOriginal: 109.90, descuento: 18, imagen: "/img/ropa-1.jpg", marca: "Nike", categoria: "ropa" },
    { id: 5, nombre: "Mochila Deportiva", precio: 179.90, precioOriginal: 199.90, descuento: 10, imagen: "/img/accesorios-1.jpg", marca: "Nike", categoria: "accesorios" },
    { id: 6, nombre: "Zapatilla Mujer Elegance", precio: 279.90, precioOriginal: 329.90, descuento: 15, imagen: "/img/zapatilla-4.jpg", marca: "Clarks", categoria: "zapatillas" },
    { id: 7, nombre: "Sandalia Mujer Verano", precio: 129.90, precioOriginal: 149.90, descuento: 13, imagen: "/img/sandalias-2.jpg", marca: "Nike", categoria: "sandalias" },
    { id: 8, nombre: "Polo Mujer Essential", precio: 79.90, precioOriginal: 99.90, descuento: 20, imagen: "/img/ropa-2.jpg", marca: "Adidas", categoria: "ropa" },
]

export default function Page() {
    return (
        <section className="space-y-5">
            <header>
                <h2 className="text-xl font-bold text-gray-800">Recomendadas para ti</h2>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productos.map((p) => (
                    <Link href={`/producto?id=${p.id}`} key={p.id} className="group">
                        <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative aspect-square bg-gray-100">
                                <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                {p.descuento > 0 && (
                                    <Badge variant="destructive" className="absolute top-2 left-2 text-xs font-bold">
                                        -{p.descuento}%
                                    </Badge>
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle className="text-sm font-semibold text-gray-800">{p.nombre}</CardTitle>
                                <CardDescription className="text-xs text-gray-500">{p.marca}</CardDescription>
                            </CardHeader>
                            <CardFooter className="gap-2 items-center">
                                <p className="text-red-500 font-bold text-lg">S/ {p.precio.toFixed(2)}</p>
                                {p.precioOriginal > p.precio && (
                                    <small className="line-through text-gray-400">S/ {p.precioOriginal.toFixed(2)}</small>
                                )}
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}