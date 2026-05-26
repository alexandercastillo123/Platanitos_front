import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Page() {
    return (
        <section className="p-4 max-w-4xl mx-auto space-y-4">
            <h2 className="text-xl font-bold mb-4">Favoritos</h2>

            <article className="relative flex flex-col justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full">

                <button className="absolute top-6 left-[185px] z-10 text-green-600 hover:scale-110 transition-transform cursor-pointer">
                    <Heart className="w-6 h-6 fill-current text-emerald-500" />
                </button>

                <div className="flex gap-4 items-start w-full mb-6">

                    <div className="bg-gray-100 p-2 rounded-md flex items-center justify-center min-w-[200px] h-[200px]">
                        <img
                            src="/zapaato.jpg"
                            alt="Zapatilla Colloky"
                            className="object-contain h-full w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-4 pt-2">
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm md:text-base">Colloky</h3>
                            <p className="font-semibold text-gray-700 text-sm md:text-base">
                                Zapatilla Unisex Gunix 27020310v26
                            </p>
                            <p className="text-xs text-gray-500 mt-1 font-medium">Color: Blanco</p>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-red-600 font-bold text-sm md:text-base">S/ 71.40</span>
                            <span className="text-gray-400 line-through text-xs font-medium">S/ 119.00</span>
                        </div>
                    </div>

                </div>

                <Button
                    variant="outline"
                    className="w-full uppercase cursor-pointer tracking-wider border-emerald-600 text-emerald-700 hover:bg-green-800 hover:text-white transition-colors py-5 font-semibold text-xs"
                >
                    Agregar al carrito
                </Button>

            </article>
        </section>
    );
}