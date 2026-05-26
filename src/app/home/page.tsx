"use client";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {
  const categorias = [
    { nombre: 'Zapatillas', img: '/img/categoria-zapatillas.jpg', ruta: '/zapatillas' },
    { nombre: 'Sandalias', img: '/img/categoria-sandalias.jpg', ruta: '/sandalias' },
    { nombre: 'Ropa', img: '/img/categoria-ropa.jpg', ruta: '/ropa' },
    { nombre: 'Accesorios', img: '/img/categoria-accesorios.jpg', ruta: '/accesorios' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1">
      
        <section className="w-full max-w-7xl mx-auto mt-4 px-4">
          <Carousel className="w-full rounded-xl overflow-hidden">
            <CarouselContent>
             
              <CarouselItem>
                <div className="relative h-[250px] md:h-[450px] w-full bg-zinc-200">
                  <Image 
                    src="/img/banner-1.jpg" 
                    alt="Lanzamiento Nike"
                    fill
                    className="object-cover"
                    priority 
                  />
                </div>
              </CarouselItem>
           
              <CarouselItem>
                <div className="relative h-[250px] md:h-[450px] w-full bg-zinc-300">
                  <Image 
                    src="/img/banner-2.jpg"
                    alt="Liquidación de temporada"
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative h-[250px] md:h-[450px] w-full bg-zinc-300">
                  <Image 
                    src="/img/banner-3.jpg"
                    alt="Liquidación de temporada"
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>

               <CarouselItem>
                <div className="relative h-[250px] md:h-[450px] w-full bg-zinc-300">
                  <Image 
                    src="/img/banner-4.jpg"
                    alt="Liquidación de temporada"
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

       
        <section className="w-full max-w-7xl mx-auto mt-8 px-4 mb-12">
          <h2 className="text-xl font-bold mb-4">Categorías Destacadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categorias.map((cat) => (
              <Link href={cat.ruta} key={cat.nombre} className="group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                  <Image 
                    src={cat.img} 
                    alt={`Categoría ${cat.nombre}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                    {cat.nombre}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}