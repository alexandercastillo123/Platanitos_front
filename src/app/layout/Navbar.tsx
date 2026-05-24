"use client";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-black text-white text-xs text-center py-2">
        ENVÍO GRATIS A PARTIR DE S/ 149.00
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          
          
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/mujer" className="text-lg font-medium">Mujer</Link>
                  <Link href="/hombre" className="text-lg font-medium">Hombre</Link>
                  <Link href="/ninos" className="text-lg font-medium">Niños</Link>
                  <Link href="/marcas" className="text-lg font-medium">Marcas</Link>
                  <Link href="/ofertas" className="text-lg font-medium text-red-600">Ofertas</Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            <Link href="/" className="text-2xl font-black tracking-tighter">
              PLATANITOS
            </Link>
          </div>

          
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <Input 
              type="text" 
              placeholder="¿Qué estás buscando hoy?" 
              className="w-full pl-4 pr-10 rounded-full border-gray-300 focus-visible:ring-black"
            />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full rounded-r-full hover:bg-transparent">
              <Search className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

       
        <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-t text-sm font-medium">
          <Link href="/mujer" className="hover:underline hover:text-gray-600">MUJER</Link>
          <Link href="/hombre" className="hover:underline hover:text-gray-600">HOMBRE</Link>
          <Link href="/ninos" className="hover:underline hover:text-gray-600">NIÑOS</Link>
          <Link href="/zapatillas" className="hover:underline hover:text-gray-600">ZAPATILLAS</Link>
          <Link href="/marcas" className="hover:underline hover:text-gray-600">MARCAS</Link>
          <Link href="/ofertas" className="text-red-600 hover:underline">OFERTAS</Link>
        </nav>
      </div>
    </header>
  );
}