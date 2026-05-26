"use client";

import { useState } from "react";
import { CATEGORIAS_MOCK } from "@/mocks/menuCategoryMock";
import { ChevronDown, ChevronUp } from "lucide-react";
import MenuBar from "./menuBar";

export default function SubNavbar() {
  const [categoriaAbiertaId, setCategoriaAbiertaId] = useState<string | null>(null);


  const categoriaActiva = CATEGORIAS_MOCK.find(cat => cat.id === categoriaAbiertaId);

  const toggleCategoria = (id: string) => {

    if (categoriaAbiertaId === id) {
      setCategoriaAbiertaId(null);
    } else {
      setCategoriaAbiertaId(id);
    }
  };

  return (
    <div className="relative border-b border-gray-200 bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-6 h-12">
        {CATEGORIAS_MOCK.map((cat) => {
          const estaAbierta = categoriaAbiertaId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => toggleCategoria(cat.id)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-all h-full px-2 border-b-2 
                ${estaAbierta 
                  ? "border-green-700 text-green-700 font-semibold" 
                  : "border-transparent text-gray-700 hover:text-green-700 hover:border-gray-300"
                }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.titulo}</span>
              {estaAbierta ? (
                <ChevronUp className="w-3.5 h-3.5 text-green-700" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>
          );
        })}
      </div>

      {categoriaActiva && (
        <>
          <div 
            className="fixed inset-0 bg-black/10 z-40 mt-39.5" 
            onClick={() => setCategoriaAbiertaId(null)} 
          />
          
          <div className="absolute top-full left-0 w-full bg-white z-50 shadow-2xl">
            <MenuBar
              categoria={categoriaActiva} 
              onClose={() => setCategoriaAbiertaId(null)} 
            />
          </div>
        </>
      )}
    </div>
  );
}