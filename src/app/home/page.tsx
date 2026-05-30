"use client";
import CategoryCircles from "@/components/CategoryCircles";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/layout/Navbar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const brands = [
  { id: "platanitos",   name: "Platanitos",    logo: "/img/logos/platanitos.jpg" },
  { id: "kayser",       name: "Kayser",        logo: "/img/logos/kayser.jpg" },
  { id: "flying-tiger", name: "FLYING TIGER",  logo: "/img/logos/flyingtiger.jpg" },
  { id: "adidas",       name: "adidas",        logo: "/img/logos/adidas.png" },
  { id: "limoni",       name: "LIMONI",        logo: "/img/logos/limoni.png" },
  { id: "nike",         name: "Nike",          logo: "/img/logos/nike.webp" },
  { id: "rebook",       name: "Rebook",        logo: "/img/logos/rebook.png" },
  { id: "colloky",      name: "Colloky",       logo: "/img/logos/colloky.png" },
  { id: "underarmour",  name: "Under Armour",  logo: "/img/logos/underarmour.png" },
  { id: "newbalance",   name: "New Balance",   logo: "/img/logos/newbalance.png" },
  { id: "umbro",        name: "Umbro",         logo: "/img/logos/umbro.webp" },
  { id: "puma",         name: "Puma",          logo: "/img/logos/puma.png" },
];

const categorias = [
  { nombre: 'Zapatillas', img: '/img/categoria-zapatillas.jpg', ruta: '/zapatillas' },
  { nombre: 'Sandalias',  img: '/img/categoria-sandalias.jpg',  ruta: '/sandalias' },
  { nombre: 'Ropa',       img: '/img/categoria-ropa.jpg',       ruta: '/ropa' },
  { nombre: 'Accesorios', img: '/img/categoria-accesorios.jpg', ruta: '/accesorios' },
];


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">

     
        <section className="w-full max-w-7xl mx-auto mt-4 px-4">
          <Carousel className="w-full rounded-xl overflow-hidden">
            <CarouselContent>
              {["/img/banner-1.jpg", "/img/banner-2.jpg", "/img/banner-3.jpg", "/img/banner-4.jpg"].map((src, i) => (
                <CarouselItem key={i}>
                  <div className="relative h-[250px] md:h-[450px] w-full bg-zinc-200">
                    <Image src={src} alt={`Banner ${i + 1}`} fill className="object-cover" priority={i === 0} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        
        <CategoryCircles
          className="w-full max-w-7xl mx-auto mt-8 px-4 mb-12"
          onSelect={(id) => router.push(`/categoria/${id}`)}
        />

       
        <section className="w-full max-w-7xl mx-auto mt-8 px-4 mb-12">
          <h2 className="text-xl font-bold mb-4">Categorías Destacadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categorias.map((cat) => (
              <Link href={cat.ruta} key={cat.nombre} className="group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                  <Image src={cat.img} alt={`Categoría ${cat.nombre}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg">{cat.nombre}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

          
      {/* Banners promocionales 3 columnas */}
<section className="w-full max-w-7xl mx-auto mt-8 px-4 mb-12">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div className="relative h-[220px] rounded-xl overflow-hidden cursor-pointer group">
      <Image src="/img/promos/cartera-fiestapromo.webp" alt="Carteras Fiesta" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1">
      </div>
      <div className="absolute bottom-4 left-4">
        <p className="text-white text-sm font-semibold mb-2">lo mejor en</p>
        <button className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          Carteras Fiesta →
        </button>
      </div>
    </div>

    <div className="relative h-[220px] rounded-xl overflow-hidden cursor-pointer group">
      <Image src="/img/promos/calzadodama.webp" alt="Calzado Damas" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-4 left-4">
        <p className="text-yellow-400 text-xs font-semibold">hasta</p>
        <p className="text-yellow-400 text-5xl font-black leading-none">60<span className="text-2xl">%</span></p>
        <p className="text-yellow-400 text-xs font-bold tracking-widest mb-2">DCTO</p>
        <button className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          Calzado Damas →
        </button>
      </div>
    </div>

    <div className="relative h-[220px] rounded-xl overflow-hidden cursor-pointer group">
      <Image src="/img/promos/cartera-promo.jpg" alt="Carteras" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-4 left-4">
        <p className="text-yellow-400 text-xs font-semibold">hasta</p>
        <p className="text-yellow-400 text-5xl font-black leading-none">60<span className="text-2xl">%</span></p>
        <p className="text-yellow-400 text-xs font-bold tracking-widest mb-2">DCTO</p>
        <button className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          Carteras →
        </button>
      </div>
    </div>

  </div>
</section>

        <section className="w-full max-w-7xl mx-auto mt-8 px-4 mb-12">
          <p className="text-xl font-bold mb-4">Múltiples marcas que te van a encantar</p>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3">
              {brands.map((brand) => (
                <CarouselItem key={brand.id} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div className="flex flex-col items-center justify-between gap-3 border border-gray-200 rounded-xl p-4 h-36 hover:shadow-md transition-shadow cursor-pointer bg-white">
                    <div className="flex-1 flex items-center justify-center w-full">
                      <Image src={brand.logo} alt={brand.name} width={120} height={60} className="object-contain max-h-14" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">{brand.name}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
          <div className="flex justify-center mt-6">
            <button className="border border-green-700 text-green-700 text-sm font-semibold px-8 py-2.5 rounded hover:bg-green-50 transition-colors tracking-widest">
              VER TODAS LAS MARCAS
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}