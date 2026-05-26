'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { CATEGORIAS_MOCK, PrincipalCategory } from "@/mocks/menuCategoryMock"
import { ChevronRight } from "lucide-react"

interface MegaMenuProps {
    categoria: PrincipalCategory;
    onClose: () => void;
}

export default function MenuBar({ categoria, onClose }: MegaMenuProps) {

    const [sectionActivaIndex, setSectionActivaIndex] = useState(0);
    useEffect(() => {
        setSectionActivaIndex(0);
    }), [categoria]

    const sectionActual = categoria.secciones[sectionActivaIndex];
    return (
        <div className="w-full bg-white flex mx-w-7xl mx-auto min-h-125">
            <div>
                {categoria.secciones.map((section, index) => {
                    const esActiva = index === sectionActivaIndex;
                    return (
                        <button
                            key={index}
                            onClick={() => setSectionActivaIndex(index)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-sm
                                ${esActiva
                                    ? `bg-white text-green-700 shadow-sm border-green-700 border-l-4 font-semibold`
                                    : ` text-gray-700 hover:bg-gray-100`
                                }`}
                        >
                            <span>{section.titulo}</span>
                            <ChevronRight className={`w-4 h-4 ${esActiva ? 'text-green-700' : 'text-gray-400'}`}></ChevronRight>
                        </button>
                    );
                })}
            </div>
            <div>
                {sectionActual ? (
                    <div className="p-5">
                        {sectionActual.titulo}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 content-start overflow-y-auto">
                            {sectionActual.enlaces?.map((enlaces, idx) => (
                                <Link
                                    key={idx}
                                    href={enlaces.href}
                                    onClick={onClose}
                                    className="text-sm text-gray-600 hover:text-green-700 hover:underline transition-colors py-0.5"
                                >
                                    {enlaces.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-400 text-sm flex items-center justify-center h-full">
                        Selecciona una categoria
                    </div>
                )}
            </div>

        </div>
    )
}